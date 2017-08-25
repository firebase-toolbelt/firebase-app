const { newDataHasChildren } = require('firebase-rules/helpers/common');

module.exports = {
	root: {
		'.write': `newData.child(\'__authUserId\').val() == auth.uid`,
		'.validate': newDataHasChildren(['__authUserId', '__timestamp', '__action', 'action'])
	},
	authUserId: {
		'.validate': `newData.val() == auth.uid`
	},
	timestamp: {
		'.validate': `newData.val() <= now`
	},
	action: {
		'.validate': `newData.parent().child('action').child(newData.val()).exists()`
	},
	other: {
		'.write': false
	}
};
