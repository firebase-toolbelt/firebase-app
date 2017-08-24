const getAllFiles = require('./utils/getAllFiles');
const generateFileRules = require('./utils/generateFileRules');
const getLogOwners = require('../utils/getLogOwners');
const buildGetLogPath = require('../utils/getLogPath');
const update = require('lodash/update');

module.exports = function generateRules(config, commandSource) {
	let rulesObj = {};
  let rulesByPathObj = {};
  let rulesGenerated = {};

  const ruleSource = config.rules || commandSource + '/src/**/*.rules.js';
  const filePaths = getAllFiles(ruleSource);

  const logOwners = getLogOwners(config);
  const getLogPath = buildGetLogPath(config, logOwners);

  filePaths.forEach((filePath) => {
    const fileRules = require(filePath);
    rulesGenerated = generateFileRules(fileRules, rulesByPathObj, config, logOwners, getLogPath);
    rulesByPathObj = rulesGenerated.rules;
  });

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
