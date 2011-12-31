// Load the required modules
var cleanCSS = require('clean-css');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

/**
 * Compiles multiple CSS and JavaScript files into one JavaScript file
 * 
 * @param {Array} files An array of file objects containing a type and file contents
 * @return {String} The compiled assets
 */
exports.compile = function(files) {
	// Initialise required variables
	var file = null;
	var js = '';
	var css = '';
	
	// Loop over the files
	for(var i = 0; i < files.length; i += 1) {
		file = files[i];
		
		// Preprocess the file if required
		
		// Add the files contents to the right string
		if(file.type === 'css') {
			css += file.content;
		}
		else if(file.type === 'js') {
			js += file.content;
		}
	}
	
	// Return the compiled assets
	var ast = jsp.parse(js); // parse code and get the initial AST
	ast = pro.ast_mangle(ast); // get a new AST with mangled names
	ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
	
	return cleanCSS.process(css) + pro.gen_code(ast);
};