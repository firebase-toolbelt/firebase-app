let covered = 0;

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

module.exports = function checkRulesCoverage(setup, config, fileRules) {

	const {
		owners,
		actions
	} = config;

  if (setup == 'owners') {
  	covered += getPathsWithRules(owners, fileRules);
  } 
  if (setup == 'actions') {
  	covered += getPathsWithRules(actions, fileRules);
  }

  const totalPaths = Object.keys(owners).length + Object.keys(actions).length;

  const total = totalPaths || 0;
	const coverage = totalPaths ? (covered / totalPaths) : 0;
	const percentage = `${Math.round(coverage * 100)}%`;

  return {
  	covered,
  	total,
  	percentage
  };

}
