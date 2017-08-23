const getAllFiles = require('./utils/getAllFiles');
const generateRules = require('./utils/generateRules');
const getLogOwners = require('../utils/getLogOwners');
const buildGetLogPath = require('../utils/getLogPath');
const update = require('lodash/update');

module.exports = function buildGenerateRules(config, commandSource) {
  let rulesObj = {};
  let rulesByPathObj = {};
  let rulesGenerated = {};

  /**
   * Get all rules files paths, logOwners and logPath function
   */

  const ruleSource = config.rules || commandSource + '/src/**.rules.js';
  const filePaths = getAllFiles(ruleSource);

  const logOwners = getLogOwners(config);
  const getLogPath = buildGetLogPath(config, logOwners);

  /**
   * Generate rules in each files path
   */

  filePaths.forEach((filePath) => {
    const fileRules = require(filePath);
    rulesGenerated = generateRules(fileRules, rulesByPathObj, config, logOwners, getLogPath);
    rulesByPathObj = rulesGenerated.rules;
  });

  /**
   * Update each rule path to a object format
   */

  Object.keys(rulesByPathObj).forEach((path) => {
    const pathRules = rulesByPathObj[path];
    const pathArr = path.split('/').filter((subpath) => subpath && subpath.length);
    update(rulesObj, pathArr, (rules) => rules ? Object.assign({}, rules, pathRules) : pathRules);
  })

  return { 
    rules: rulesObj,
    totalPaths: rulesGenerated.totalPaths,
    totalPathsWithRules: rulesGenerated.totalPathsWithRules
  };
}
