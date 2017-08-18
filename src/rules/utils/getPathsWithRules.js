module.exports = function getPathsWithRules(paths, ruleKey) {
	let pathWithRules = 0;

	Object.keys(paths).forEach(pathId => {
    if (pathId == ruleKey) {
      pathWithRules = pathWithRules + 1;
    }
  });

  return pathWithRules;
}
