'use strict';

module.exports = function (grunt) {

	var regexp = /^[ \t]*\/\/[ \t]*(.*)$/;

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('evilList', 'Your task description goes here.', function () {
		var options = this.options({
			markdown: false
		});
		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			// Concat specified files.
			grunt.log.writeln(f.src);
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (filepath) {
				// Read file source.
				return { path: filepath, src: grunt.file.read(filepath) };
			}).map(function (file) {
				var dest = [];
				var lines = file.src.split('\n');
				var tag = -1;
				for (var i = 0; i < lines.length - 1; i++) {
					if (tag !== -1) {
						var match = lines[i].match(regexp);
						if (match) {
							dest.push(match[1]);
						} else {
							if (options.markdown) {
								dest.push("```js");
							}
							dest.push(lines[i]);
							if (options.markdown) {
								dest.push("```");
							}
							tag = -1;
						}
					}
					if (lines[i].indexOf("/* jshint evil:true */") !== -1) {
						tag = i + 1;
						dest.push((options.markdown ? "##":"") + "file: " + file.path + ", line: " + tag);
					}
				}
				if (options.markdown && dest.length > 0) {
					dest.push("---");
				}
				return dest.join("\n");
			});

			// Write the destination file.
			grunt.file.write(f.dest, src.join("\n"));

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
