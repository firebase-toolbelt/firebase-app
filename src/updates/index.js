const action = require('../../demo/actions/authUsers/createAuthUser');
const owners = require('../../demo/owners/owners');
const authUserPaths = require('../../demo/paths/authUsers');

function validateProps(props, data) {
	return new Promise((resolve, reject) => {
		props.forEach((prop, i) => {

			if (data[prop] == null) {
				reject();
			}

			if ((i + 1) == props.length) {
				resolve();
			}
		
		});
	});
}

function getActionUpdates(actionType, data) {

	const { validate, updates } = action[actionType];

	return validateProps(validate, data).then(() => (
		updates(data, authUserPaths.paths)
	));

}

getActionUpdates('updateUserName', { 
	userId: '123', 
	userName: 'new user name' }
).then(updateUserNameAction => {
	console.log(updateUserNameAction)
});

module.exports = {
	getActionUpdates
}