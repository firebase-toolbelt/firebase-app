const { actions, paths } = require('../../demo');

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

module.exports = function getActionUpdates(ownerType, actionType, data) {

	const action = actions[ownerType][actionType];
	const ownerPaths = paths[ownerType];

	const { validate, updates } = action;

	return validateProps(validate, data).then(() => (
		updates(data, ownerPaths.paths)
	));

}

