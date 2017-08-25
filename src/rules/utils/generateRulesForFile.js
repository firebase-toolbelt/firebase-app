const omit = require('lodash/fp/omit');
const mapKeys = require('lodash/mapKeys');
const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const ownerMetaChildrenRules = require('./ownerMetaChildrenRules');

/**
 * If ruleValue in path file is string create read rule
 * otherwise create rule object especified in path file
 */

function getDefaultPathRules(ruleValue) {
  if (isString(ruleValue)) {
    return { '.read': ruleValue };
  } else {
    return mapKeys(ruleValue, (value, key) => `.${key}`);
  }
}

/**
 * Generate rules for path files
 */

function generateRulesForPath(rulesObj, ruleKey, ruleValue) {
  rulesObj[ruleKey] = getDefaultPathRules(ruleValue);
}

/**
 * Generate rules for owner files
 */

function generateRulesForOwner(rulesObj, ruleKey, ruleValue, config, logOwners, getLogPath) {

  /**
   * Get log parent paths to log hidden and log not hidden 
   */

  const logParentPaths = [true, false].map((isLogHidden) => (
    getLogPath(
      logOwners[ruleKey].rules,
      ruleKey,
      false,
      isLogHidden,
      true
    )
  ));

  /**
   * Mount owner rules creating default rule for each log parent paths
   */

  logParentPaths.forEach((logParentPath) => {
    const logPath = `${logParentPath}/$logId`;
    rulesObj[logParentPath] = getDefaultPathRules(ruleValue);
    rulesObj[logPath] = ownerMetaChildrenRules.root;
    rulesObj[logPath]['__authUserId'] = ownerMetaChildrenRules.authUserId;
    rulesObj[logPath]['__timestamp'] = ownerMetaChildrenRules.timestamp;
    rulesObj[logPath]['__action'] = ownerMetaChildrenRules.action;
    rulesObj[logPath]['$any'] = ownerMetaChildrenRules.other;
  });

}

/**
 * Generate rules for action files
 */

function generateRulesForAction(rulesObj, ruleKey, ruleValue, config, logOwners, getLogPath) {
  const action = config.actions[ruleKey];
  const owners = action.log || [null];

  owners.forEach((ownerId) => {

    const ownerPath = logOwners[ownerId].rules;
    const logPath = getLogPath(ownerPath, ownerId, '$logId', action.logHidden, true);
    const actionPath = `${logPath}/action/${action.id}`;

    rulesObj[actionPath] = { '.write': ruleValue };
    
  });
}

module.exports = function generateRulesForFile(rulesObj, config, logOwners, getLogPath) {
  return (filePath) => {

    let fileRules = require(filePath);
    const setup = fileRules.__setup__;
    const defaultRules = fileRules.__default__;
    fileRules = omit(['__setup__', '__default__'])(fileRules);
  
    /**
     * Mount rules object for each action, owner and path files
     */
  
    const ruleGenerator = (
      (setup === 'owners') ? generateRulesForOwner :
      (setup === 'actions') ? generateRulesForAction :
        generateRulesForPath
    );
  
    let newRulesObj = Object.assign({}, rulesObj);
  
    Object.keys(fileRules).forEach((ruleKey) => {
      ruleGenerator(
        newRulesObj,
        ruleKey,
        fileRules[ruleKey] || defaultRules,
        config,
        logOwners,
        getLogPath
      );
    });

    return newRulesObj;

  };
}