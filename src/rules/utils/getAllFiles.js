const glob = require('glob');

module.exports = function getAllFiles(ruleSource) {
	return glob.sync(ruleSource);
}
