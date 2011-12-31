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

// Initialise the required global variables
var fileList = null,
	fileListPath = program.fileList || './assets.json';

// Load the file list
fs.readFile(fileListPath, 'utf8', function(err, data) {
	if(err) {
		logme.error('The file list (' + fileListPath + ') could not be read.');
	}
	else {
		// Decode the data
		try {
			fileList = JSON.parse(data);
		}
		catch(e) {
			logme.error('The file list (' + fileListPath + ') is not valid JSON.');
		}
	}
});