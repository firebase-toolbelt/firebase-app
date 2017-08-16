#!/usr/bin/env node

const program = require('commander');
const buildGenerateRules = require(__dirname + '/src/rules');

program
	.arguments('<ruleSource>')
	.action(function(ruleSource) {
	  buildGenerateRules(ruleSource).then(rules => {
	  	console.log(rules);
	  });
	})
	.parse(process.argv);
