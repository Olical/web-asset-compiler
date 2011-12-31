#!/usr/bin/env node

// Load the required modules
var fs = require('fs');
var path = require('path');
var program = require('commander');
var logme = require('logme');

// Set up commander
program
	.version('0.0.0')
	.option('-l, --fileList [path]', 'Specify a diffent file list to the default assets.json')
	.parse(process.argv);

// Load the file list
fs.readFile(program.fileList || './assets.json', 'utf8', function(err, data) {
	
});