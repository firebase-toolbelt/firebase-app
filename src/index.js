import buildGetActionUpdates from './actions/getActionUpdates';
import buildExecuteAction from './actions/executeAction';
import buildApplyAction from './actions/applyAction';

export default function getHelpers(config) {

	const getActionUpdates = buildGetActionUpdates(config);
	const executeAction = buildExecuteAction(config, getActionUpdates);
	const applyAction = buildApplyAction(config, getActionUpdates);

	return {
		getActionUpdates,
		executeAction,
		applyAction
	};
};
