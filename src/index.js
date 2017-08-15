const getActionUpdates = require('./updates/getActionUpdates');
const buildExecuteAction = require('./updates/executeAction');
const applyAction = require('./updates/applyAction');

module.exports = function getHelpers(config) {

	const getActionUpdates = buildGetActionUpdates(config);
	const executeAction = buildExecuteAction(config, getActionUpdates);
	const applyAction = buildApplyAction(config, getActionUpdates);

	return {
		getActionUpdates,
		executeAction,
		applyAction
	};	
};
