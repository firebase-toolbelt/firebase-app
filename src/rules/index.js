const getAllFiles = require('./utils/getAllFiles');
const generateRules = require('./utils/generateRules');
const getLogOwners = require('../utils/getLogOwners');
const buildGetLogPath = require('../utils/getLogPath');

module.exports = function buildGenerateRules(config) {
  let rulesObj = {};

  const ruleSource = config.rules || 'src/**/*.rules.js';
  const filePaths = getAllFiles(ruleSource);

  const logOwners = getLogOwners(config);
  const getLogPath = buildGetLogPath(config, logOwners);

  filePaths.forEach((filePath) => {
    const fileRules = require(filePath);
    rulesObj = generateRules(fileRules, rulesObj, config, logOwners, getLogPath);
  });

  return rulesObj;
}
