const getAllFiles = require('./utils/getAllFiles');
const generateRulesForFile = require('./utils/generateRulesForFile');
const update = require('lodash/update');

module.exports = function generateRules(config, logOwners, getLogPath, commandSource) {
  let rulesObj = {};
  let rulesByPathObj = {};

  /**
   * Get all rule files.
   */

  const rulesSource = config.rules || commandSource + '/src/**.rules.js';
  const filePaths = getAllFiles(rulesSource);

  /**
   * Generate rules for each rule file.
   */

  filePaths.forEach(
    generateRulesForFile(rulesByPathObj, config, logOwners, getLogPath)
  );

  /**
   * Update each rule path to an object format.
   */

  Object.keys(rulesByPathObj).forEach((path) => {
    const pathRules = rulesByPathObj[path];
    const pathArr = path.split('/').filter((subpath) => subpath && subpath.length);
    update(rulesObj, pathArr, (rules) => rules ? Object.assign({}, rules, pathRules) : pathRules);
  })

  return {
    rules: rulesObj,
    filePaths
  };
  
}
