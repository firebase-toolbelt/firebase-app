const glob = require('glob');

module.exports = function readAllFiles(ruleSource) {
  return new Promise((resolve, reject) => {

    glob(`${ruleSource}/**/*.rules.js`, (err, files) => {
      if (err) {
        reject(new Error(err));
      }

      resolve(files);
    });

  });
}
