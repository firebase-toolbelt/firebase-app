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
	  	coverage 
	  } = generateRules(ruleConfig, commandSource);
		
		const {
			covered,
	  	total,
	  	percentage
		} = coverage;

	  writeFile(commandSource + '/database.rules.json', JSON.stringify({ rules }), function (err) {
	  	if (!err) {
	  		console.log(`Paths coverage: ${covered} of ${total} (${percentage})`);
	  		console.log('File created in ' + commandSource + '/database.rules.json');
	  	} else {
	  		console.warn('Error creating rules.json file.');
	  	}
	  });

	})
	.parse(process.argv);
