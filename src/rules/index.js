const readAllFiles = require('./_readAllFiles');
const generateRules = require('./_generateRules');

module.exports = function buildGenerateRules(ruleSource) {
  let rulesObj = {};

  return new Promise((resolve, reject) => {
    readAllFiles(ruleSource).then(files => {
      files.forEach((file, i) => {

        let fileRules = require(`../../${file}`);

        generateRules(fileRules, rulesObj).then(() => {
          if ((i + 1) == files.length) {
            rulesObj['__setup__'] = null;
            resolve(rulesObj);
          }
        });

      })
    });
  });
}
