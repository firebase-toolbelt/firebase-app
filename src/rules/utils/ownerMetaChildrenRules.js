const { anyCondition } = require('firebase-rules/helpers/conditions');
const { hasChildren } = require('firebase-rules/helpers/common');

module.exports = {
	'.validate': anyCondition(
		hasChildren(['__authUserId', '__timestamp', '__action', 'action']),
		`newData.child('__authUserId').val() == auth.uid`,
		`newData.child('__timestamp').val() <= now`,
		`newData.child('action').child(newData.child('__action')).exists()`
	)
};
