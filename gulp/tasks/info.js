function readDir(catalog) {
  return new Promise(function(resolve, reject) {
    $.fs.readdir(catalog, function(err, files) {
      var result = {};
      let p = files.map(function(name) {
        return new Promise(function(resolve, reject) {
          $.fs.stat(catalog + name, function(err, stats) {
            let obj = {};
            if (stats.isFile()) {
              obj[name] = stats.size;
              result = Object.assign(result, obj);
              resolve(result);
            } else {
              readDir(catalog + name + '/').then(data => {
                resolve(data);
              });
            }
          });
        });
      });
      Promise.all(p).then(data => {
        let result = {};
        for (let i of data) {
          Object.assign(result, i);
        }
        resolve(result);
      });
    });
  });
}

module.exports = function() {
  $.gulp.task('info', function() {
    return readDir($.config.root + '/').then(function(data) {
      let size = 0;
      let count = 0;
      for (let i in data) {
        size += data[i];
        count++;
      }
      console.info('Общий размер файлов: ', size, ' байт');
      console.info('Количество файлов: ', count);
    });
  });
};
