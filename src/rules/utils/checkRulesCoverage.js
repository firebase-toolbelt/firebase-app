const omit = require('lodash/fp/omit');

function getPathsWithRules(paths, fileRules) {
  let pathWithRules = 0;

  Object.keys(fileRules).forEach(ruleKey => {
    Object.keys(paths).forEach(pathId => {

      if (pathId === ruleKey) {
        pathWithRules = pathWithRules + 1;
      }

    });
  });

  return pathWithRules;
}

/**
 * Check if rules are created for each associated component.
 */

module.exports = function checkRulesCoverage(config, logOwners, getLogPath, rules, filePaths) {

  let covered = 0;
  let total = 0;

  const { paths, owners, actions } = config;

  /**
   * Check path rules.
   * Get root path for each defined path.
   * Prevent double checking paths with the same root key.
   */

  let pathRootKeys = {};

  Object.keys(paths).forEach((pathKey) => {

    let pathRootKey;
    const path = (typeof paths[pathKey] === 'function') ? paths[pathKey]() : paths[pathKey];
    pathRootKey = path.split('/')[0];

    if (!pathRootKeys[pathRootKey]) {
      total++;
      if (rules[pathRootKey]) covered++;
    } else {
      pathRootKeys[pathRootKey] = true;
    }

  });

  Object.keys(actions).forEach((actionKey) => {

    const action = actions[actionKey]; 

    action.log.forEach(log => {

      const owner = logOwners[log]; 
      const containsProp = rules.__log__[log][owner.rules].$logId.action[actionKey].hasOwnProperty('.write');

    });

  });

  /**
   * Check owner and action rules.
   */
  
  total += Object.keys(owners).length + Object.keys(actions).length;

  filePaths.forEach((filePath) => {

    let fileRules = require(filePath);
    fileRules = omit(['__setup__', '__default__'])(fileRules);

    covered += getPathsWithRules(owners, fileRules);
    covered += getPathsWithRules(actions, fileRules);

  });

  const coverage = total ? (covered / total) : 0;
  const percentage = `${Math.round(coverage * 100)}%`;

  return {
    covered,
    total,
    percentage
  };

};
