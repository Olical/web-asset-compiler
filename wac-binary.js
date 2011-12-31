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
	.option('-o, --output [path]', 'File that the compiled assest should be saved to')
	.option('-v, --verbose', 'Causes the program to display errors and other useful pieces information')
	.parse(process.argv);

// Initialise the required global variables
var fileListPath = program.fileList || './assets.json';

/**
 * Parses a files name and contents and drops the results into the specified object
 * 
 * @param {String} path The target files path
 * @param {Object} target The object to store the parsed data in
 * @param {Function} callback Called when done. Will pass the file and error object
 */
function parseFile(path, target, callback) {
	// Load the files contents
	fs.readFile(path, 'utf8', function(err, data) {
		// Make sure there were no errors
		if(!err) {
			// Store the contents
			target.content = data;
			
			// Calculate the type
			target.type = /(?:\.([^.]+))?$/.exec(path)[1];
		}
		
		// Run the callback
		callback.call(null, path, err);
	});
}

// Load the file list
fs.readFile(fileListPath, 'utf8', function(err, data) {
	if(err && program.verbose) {
		logme.error('The file list (' + fileListPath + ') could not be read.');
	}
	else {
		// Decode the data
		try {
			var fileList = JSON.parse(data);
			var fileObjects = [];
			var doneCount = 0;
			
			// Convert the paths to objects
			for(var i = 0; i < fileList.length; i += 1) {
				fileObjects.push({});
				parseFile(fileList[i], fileObjects[i], function(path, err) {
					if(err && program.verbose) {
						logme.error('The asset (' + path + ') could not be read.');
					}
					
					// Increment the done count
					doneCount += 1;
					
					// If it is one above the length of files then all are done
					if(doneCount >= fileList.length) {
						
					}
				});
			}
		}
		catch(e) {
			if(program.verbose) {
				logme.error('The file list (' + fileListPath + ') is not valid JSON.');
			}
		}
	}
});