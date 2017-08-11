const { projectFolder } = require('../../app.config');
const { actions, paths } = require(`../../${projectFolder}`);

function validateProps(props, data) {
	for (let i = 0; i < props.length; i++) {

		if (data[props[i]] == null) {
			return false;
		}

		if ((i + 1) == props.length) {
			return true;
		}

	}
}

module.exports = function getActionUpdates(ownerType, actionType, data) {

	const action = actions[ownerType][actionType];
	const ownerPaths = paths[ownerType];

	const { validate, updates } = action;
	const dataIsPermited = validateProps(validate, data); 

	if (dataIsPermited == false) {
		return;
	}

	return updates(data, ownerPaths.paths);

}
