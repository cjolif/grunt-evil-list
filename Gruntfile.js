/*
 * grunt-evil-list
 * https://github.com/cjolif/grunt-evil-list
 *
 * Copyright (c) 2014 Christophe Jolif
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		evilList: {
			defaultOptions: {
				options: {
				},
				files: {
					'tmp/default_options': ['test/fixtures/file1', 'test/fixtures/file2']
				}
			},
			customOptions: {
				options: {
					markdown: true
				},
				files: {
					'tmp/custom_options': ['test/fixtures/file1', 'test/fixtures/file2']
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'evilList', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
