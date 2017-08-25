/**
 * Check if rules are created for each associated component.
 */

module.exports = function checkRulesCoverage(config, logOwners, getLogPath, rules) {

  let covered = 0;
  let total = 0;
  let percentage;

  /**
   * Check path rules.
   * Get root path for each defined path.
   * Prevent double checking paths with the same root key.
   */

  let pathRootKeys = {};

  config.paths.forEach((pathKey) => {

    let pathRootKey;
    (typeof pathKey === 'function') ? pathKey() : pathKey;
    pathRootKey = pathRootKey.slice('/')[0];
     
    if (!pathRootKeys[pathRootKey]) {
      total++;
      if (rules[pathRootKey]) covered++;
    } else {
      pathRootKeys[pathRootKey] = true;
    }

  });

  /**
   * Check owner rules.
   * [in progress]
   */

  /**
   * Check action rules.
   * [in progress]
   */

  const coverage = total ? (covered / total) : 0;
  const percentage = `${Math.round(coverage * 100)}%`;

  return {
    covered,
    total,
    percentage
  };

};
