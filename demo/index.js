const actions = require('./actions');
const owners = require('./owners/owners');
const paths = require('./paths');
const { getActionUpdates, generateRules } = require('../src');

const userAction = actions.users;

// getActionUpdates(userAction.updateUserName, { 
// 	userId: '_userId',
// 	userName: '_userName'
// }).then(updates => {
// 	console.log(updates);
// });

// generateRules(paths, owners);

module.exports = {
	actions,
	owners,
	paths
}
