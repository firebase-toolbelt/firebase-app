#!/usr/bin/env node

const program = require('commander');
const buildGenerateRules = require(__dirname + '/src/rules');

program
	.arguments('<ruleConfigSource>')
	.action(function(ruleConfigSource) {

		const ruleConfig = require(`${process.cwd()}/${ruleConfigSource}`);
	  const rules = buildGenerateRules(ruleConfig);
  	console.log(rules);

	})
	.parse(process.argv);
