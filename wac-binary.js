#!/usr/bin/env node

// Load the required modules
var fs = require('fs');
var path = require('path');
var program = require('commander');
var logme = require('logme');
var wac = require('./wac');
var less = require('less');

// Set up commander
program
	.version('0.0.0')
	.option('-l, --fileList [path]', 'Specify a diffent file list to the default assets.json.')
	.option('-o, --output [path]', 'File that the compiled assest should be saved to rather than being shown in the console.')
	.option('-v, --verbose', 'Causes the program to display errors and other useful pieces information.')
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
			target.type = /(?:\.([^.]+))?$/.exec(path)[1].toLowerCase();
		}
		
		if(!err && target.type === 'less') {
			// It is less, we must compile it
			less.render(target.content, function(err, css) {
				if(err && program.verbose) {
					// Show the error
					logme.error('Conversion from LESS to CSS failed (' + path + '): ' + err.message + '.');
				}
				else {
					// It was all good, store the css and change the type
					target.content = css;
					target.type = 'css';
					
					if(program.verbose) {
						logme.info('LESS file converted to CSS successfully (' + path + ').');
					}
				}
				
				// Run the callback
				callback.call(null, path, err);
			});
		}
		else {
			// Run the callback
			callback.call(null, path, err);
		}
	});
}

// Load the file list
fs.readFile(fileListPath, 'utf8', function(err, data) {
	if(err && program.verbose) {
		logme.error('The file list (' + fileListPath + ') could not be read.');
	}
	else {
		if(program.verbose) {
			logme.info('File list loaded successfully (' + fileListPath + ').');
		}
		
		// Decode the data
		try {
			var fileList = JSON.parse(data);
			var fileObjects = [];
			var doneCount = 0;
			
			if(program.verbose) {
				logme.info('File list JSON decoded successfully (' + fileListPath + ').');
			}
			
			// Convert the paths to objects
			for(var i = 0; i < fileList.length; i += 1) {
				fileObjects.push({});
				parseFile(fileList[i], fileObjects[i], function(path, err) {
					if(err && program.verbose) {
						logme.error('The asset (' + path + ') could not be read.');
					}
					else if(!err && program.verbose) {
						logme.info('Asset loaded successfully (' + path + ').');
					}
					
					// Increment the done count
					doneCount += 1;
					
					// If it is one above the length of files then all are done
					if(doneCount >= fileList.length) {
						// So now we can compile the assets
						var result = wac.compile(fileObjects);
						
						if(program.verbose) {
							logme.info('Assets compiled.');
						}
						
						// If there is an output target then write to it, if not fire it back to the console
						if(program.output) {
							fs.writeFile(program.output, result, 'utf8', function(err) {
								if(err && program.verbose) {
									logme.error('Could not write results to output file (' + program.output + ').');
								}
								else if(!err && program.verbose) {
									logme.info('Compiled assets written to output file (' + program.output + ').');
								}
							});
						}
						else {
							console.log(result);
						}
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