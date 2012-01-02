# Web asset compiler (wac)

Combines and minifys your CSS, LESS and JavaScript into one JavaScript file.

# Installation

You can either download this repository directly, or you can use [npm](http://npmjs.org/). To install via npm you can use the following command.

	npm install web-asset-compiler -g

# Configuration

wac is configured using a simple JSON file. It can be named what ever you want although the program will look for `assets.json` by default. You can specify a different file name with the `-c` / `--config` command line argument.

The JSON consists of a single array. Each entry in the array is a string pointing to a file. The file type is determined from the files extension. Here is an example taken from the `test` directory of this repository.

	[
		"./assets/css/style.css",
		"./assets/javascript/main.js"
	]

# Author

Written by [Oliver Caldwell](http://olivercaldwell.co.uk).