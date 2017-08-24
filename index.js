#!/usr/bin/env node

const program = require('commander');
const { writeFile } = require('fs');
const generateRules = require(__dirname + '/src/rules');

program
	.arguments('<rulesConfigSource>')
	.action(function(rulesConfigSource) {

		const commandSource = process.cwd();
		const ruleConfig = require(`${commandSource}/${rulesConfigSource}`);
		
	  const { 
	  	rules, 
	  	totalPaths, 
	  	totalPathsWithRules
		} = generateRules(ruleConfig, commandSource);
		
		let total = totalPaths || 0;
		let covered = totalPathsWithRules || 0;
		let coverage = totalPaths ? totalPathsWithRules / totalPaths : 0;
		coverage = `${coverage * 100}%`;

	  writeFile(commandSource + '/database.rules.json', JSON.stringify({ rules }), function (err) {
	  	if (!err) {
	  		console.log(`Paths coverage: ${covered} of ${total} (${coverage})`);
	  		console.log('File created in ' + commandSource + '/database.rules.json');
	  	} else {
	  		console.warn('Error creating rules.json file.');
	  	}

	  	process.exit(1);
	  });

	})
	.parse(process.argv);
