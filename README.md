# Web asset compiler (wac)

Combines and minifys your CSS, LESS and JavaScript into one JavaScript file.

# Installation

You can either download this repository directly, or you can use [npm](http://npmjs.org/). To install via npm you can use the following command.

	npm install web-asset-compiler -g

# Configuration

wac is configured using a simple JSON file. It can be named what ever you want although the program will look for `assets.json` by default. You can specify a different file name with the `--config` / `-c` command line argument.

The JSON consists of a single array. Each entry in the array is a string pointing to a file. The file type is determined from the files extension. Here is an example taken from the `test` directory of this repository.

	[
		"./assets/css/style.css",
		"./assets/javascript/main.js"
	]

# Running wac

This is a complicated as you want to make it. The most simple command is simply `wac`. This will use `assets.json` as its config file and print the results to your terminal.

To write the results into a file you can use the `--output` / `-o` argument like so.

	wac -o ./assets/javascript/assets.min.js

You can specify an alternate config file in the same manor.

	wac -c ./my-config.json

If something does not appear to be working correctly you can pass the `--verbose` / `-v` argument to have information and errors printed to the terminal. All together it will look like this.

	wac -v -c ./my-config.json -o ./assets/javascript/assets.min.js

# Using your compiled assets

This is just a case of including the script. You can place it at the bottom of the body tag or in the head, it is entirely down to your preference. I reccomend placing it in the head though so that your browser has the styles the whole time that the page is loading.

No matter where you place it the styles will always be injected into the head tag.

# Author

Written by [Oliver Caldwell](http://olivercaldwell.co.uk).