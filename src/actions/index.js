const { getActionUpdates } = require('../updates');

module.exports = function executeActionUpdate(ownerType, actionType, data, firebaseRef) {
	return getActionUpdates(ownerType, actionType, data)
		.then(updates => (
			firebaseRef.updates(updates)
		));
}