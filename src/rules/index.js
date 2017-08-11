const { projectFolder } = require('../../app.config');
const { paths, owners } = require(`../../${projectFolder}`);

module.exports = function getRules() {
	let rulesObj = {};

	return new Promise((resolve, reject) => {
		owners.forEach((owner, i) => {

			const { rules } = paths[owner];
			const rulePaths = Object.keys(rules);

			rulePaths.forEach(rulePath => {
				rulesObj[rulePath] = rules[rulePath];
			});

			if ((i + 1) == owners.length) {
				resolve(rulesObj)
			}

		});
	});
}
