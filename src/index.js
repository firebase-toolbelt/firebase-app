const buildGetActionUpdates = require('./actions/getActionUpdates');
const buildExecuteAction = require('./actions/executeAction');
const buildApplyAction = require('./actions/applyAction');
const buildGetLogPath = require('./utils/getLogPath');
const getLogOwners = require('./utils/getLogOwners');

module.exports = function getHelpers(config) {

	const logOwners = getLogOwners(config);
	const getLogPath = buildGetLogPath(config, logOwners);

	const getActionUpdates = buildGetActionUpdates(config, logOwners, getLogPath);
	const executeAction = buildExecuteAction(config, getActionUpdates);
	const applyAction = buildApplyAction(config, getActionUpdates);

	return {
		getLogPath,
		getActionUpdates,
		executeAction,
		applyAction
	};
};
