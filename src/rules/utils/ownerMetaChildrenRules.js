const { hasChildren } = require('firebase-rules/helpers/common');

module.exports = {
	root: {
		'.validate': hasChildren(['__authUserId', '__timestamp', '__action', 'action'])
	},
	authUserId: {
		'.validate': `newData.val() == auth.uid`
	},
	timestamp: {
		'.validate': `newData.val() <= now`
	},
	action: {
		'.validate': `newData.parent().child('action').child(newData.val()).exists()`
	}
};
