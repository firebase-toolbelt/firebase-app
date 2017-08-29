/**
 * Check if rules are created for each associated component.
 */

module.exports = function checkRulesCoverage(config, logOwners, getLogPath, rules) {

  let covered = 0;
  let total = 0;

  const { paths, owners, actions } = config;

  /**
   * Check path rules.
   * Get root path for each defined path.
   * Prevent double checking paths with the same root key.
   */

  let pathRootKeys = {};

  Object.keys(paths).forEach(pathKey => {

    const path = (typeof paths[pathKey] === 'function') ? paths[pathKey]() : paths[pathKey];
    const pathRootKey = path.split('/')[0];

    if (!pathRootKeys[pathRootKey]) {

      total++;
      pathRootKeys[pathRootKey] = true;

      if (rules[pathRootKey]) covered++;

    }

  });

  /**
   * Check action rules.
   * Verify if each action log contains write rule
   */

  Object.keys(actions).forEach(actionKey => {

    let containsWriteProp = false;
    const action = actions[actionKey];

    action.log.forEach(log => {

      const owner = logOwners[log];
      const logActionRule = rules.__log__[log][owner.rules].$logId.action[actionKey];

      containsWriteProp = logActionRule ? logActionRule.hasOwnProperty('.write') : false;

    });

    total++;
    if (containsWriteProp) covered++;

  });

  /**
   * Check owner rules.
   * Verify if each owner log contains read rule
   */
  
  Object.keys(owners).forEach(ownerKey => {

    const ownerId = logOwners[ownerKey].rules;
    const logOwnerRule = rules.__log__[ownerKey][ownerId];

    const containsReadProp = logOwnerRule ? logOwnerRule.hasOwnProperty('.read') : false;

    total++;
    if (containsReadProp) covered++;

  });

  const coverage = total ? (covered / total) : 0;
  const percentage = `${Math.round(coverage * 100)}%`;

  return {
    covered,
    total,
    percentage
  };

};
