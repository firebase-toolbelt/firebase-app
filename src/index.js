import buildGetActionUpdates from './actions/getActionUpdates';
import buildExecuteAction from './actions/executeAction';
import buildApplyAction from './actions/applyAction';
import buildGetLogPath from './actions/utils/getLogPath';
import getLogOwners from './actions/utils/getLogOwners';

export default function getHelpers(config) {

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
