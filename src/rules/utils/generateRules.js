const omit = require('lodash/fp/omit');
const mapKeys = require('lodash/fp/mapKeys');
const flow = require('lodash/fp/flow');
const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const ownerMetaChildrenRules = require('./ownerMetaChildrenRules');

function getDefaultPathRules(ruleValue) {
  if (isString(ruleValue)) {
    return { '.read': ruleValue };
  } else {
    return flow(
      omit('write'),
      mapKeys((key) => `.${key}`)
    )(ruleValue);
  }
}

function generateRulesForPath(rulesObj, ruleKey, ruleValue) {
  rulesObj[ruleKey] = getDefaultPathRules(ruleValue);
}

function generateRulesForOwner(rulesObj, ruleKey, ruleValue, config, logOwners, getLogPath) {

  const logParentPaths = [true, false].map((isLogHidden) => (
    getLogPath(
      logOwners[ruleKey].rules,
      ruleKey,
      false,
      isLogHidden,
      true
    )
  ));


  logParentPaths.forEach((logParentPath) => {
    const logPath = `${logParentPath}/$logId`;
    rulesObj[logParentPath] = getDefaultPathRules(ruleValue);
    rulesObj[logPath] = ownerMetaChildrenRules;
  });

}

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

module.exports = function generateRules(_fileRules, rulesObj, config, logOwners, getLogPath) {

  const setup = _fileRules.__setup__;
  const defaultRules = _fileRules.__default__;
  const fileRules = omit(['__setup__', '__default__'])(_fileRules);

  let newRulesObj = Object.assign({}, rulesObj);

  const ruleGenerator = (
    (setup === 'owners') ? generateRulesForOwner :
    (setup === 'actions') ? generateRulesForAction :
      generateRulesForPath
  );

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

}
