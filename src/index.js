const getActionUpdates = require('./updates');

module.exports = function getHelpers(config) {
	return {
		applyAction,
		executeAction,
		getActionUpdates
	};
};
