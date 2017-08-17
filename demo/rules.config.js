module.exports = {
	rules: __dirname + '/**/*.rules.js',
	actions: require('./actions/actions'),
	owners: require('./owners/owners'),
	paths: require('./paths/paths'),
	logPath: 'log'
}
