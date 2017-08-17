#!/usr/bin/env node

const program = require('commander');
const { writeFile } = require('fs');
const buildGenerateRules = require(__dirname + '/src/rules');

program
	.arguments('<ruleConfigSource>')
	.action(function(ruleConfigSource) {

		const commandSource = process.cwd();
		const ruleConfig = require(`${commandSource}/${ruleConfigSource}`);
	  const rules = buildGenerateRules(ruleConfig, commandSource);

	  writeFile(commandSource + '/rules.json', JSON.stringify(rules), function (err) {
	  	if (!err) {
	  		console.log('File created in ' + commandSource + '/rules.json');
	  	} else {
	  		console.log('Error to create rules.json file');
	  	}

	  	process.exit(1);
	  });

	})
	.parse(process.argv);
