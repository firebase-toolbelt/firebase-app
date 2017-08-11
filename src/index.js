const getActionUpdates = require('./updates');
const executeActionUpdate = require('./actions');
const getRules = require('./rules');

const updateUserNameAction = getActionUpdates('users', 'updateUserName', { 
	userId: '123', 
	userName: 'new user name' 
})

console.log(updateUserNameAction);

module.exports = {
	getActionUpdates,
	executeActionUpdate,
	getRules
}