const firebase = require('firebase');
const getActionUpdates = require('./updates');
const executeActionUpdate = require('./actions');

getActionUpdates('users', 'updateUserName', { 
	userId: '123', 
	userName: 'new user name' 
}).then(updateUserNameAction => {
	console.log(updateUserNameAction);
});

module.exports = {
	getActionUpdates,
	executeActionUpdate
}