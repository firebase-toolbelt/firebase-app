#!/usr/bin/env node

/**
 * Fetches a config object that must hold all the app's components.
 * Then it generate a firebase rules based on this object and it's components.
 * Then it parses this objects and checks the app's components rules coverage.
 * At last it creates a valid firebase rules json file
 * and prints the coverage reports on the terminal.
 */

const { writeFile } = require('fs');
const program = require('commander');
const generateRules = require(__dirname + '/src/rules');
const checkRulesCoverage = require(__dirname + '/src/rules/utils/checkRulesCoverage');

program
	.arguments('<customConfigPath>')
	.action(function(customConfigPath) {

		/**
		 * Fetch the config object specified by the passed param.
		 */

		const commandSource = process.cwd();
		const configPath = customConfigPath || 'firebaseapp.config.js';
		const config = require(`${commandSource}/${configPath}`);

		/**
		 * Build the needed objects based on the config object.
		 */

		const logOwners = getLogOwners(config);
		const getLogPath = buildGetLogPath(config, logOwners);
		
		/**
		 * Generate the rules object.
		 */

		const rules = generateRules(config, logOwners, getLogPath, commandSource);

		/**
		 * Check the rules coverage.
		 */

		const coverage = checkRulesCoverage(config, logOwners, getLogPath, rules);

		/**
		 * Write file and print coverage reports.
		 */

		const rulesFileName = config.rulesFileName || 'database.rules.json'; 

	  writeFile(`${commandSource}/${rulesFileName}`, JSON.stringify({ rules }), function (err) {
	  	if (!err) {
	  		console.log(`Paths coverage: ${coverage.covered} of ${coverage.total} (${coverage.percentage})`);
	  		console.log(`File created in ${commandSource}/${rulesFileName}`);
	  	} else {
	  		console.warn('Error creating rules file.');
	  	}
	  });

	})
	.parse(process.argv);
