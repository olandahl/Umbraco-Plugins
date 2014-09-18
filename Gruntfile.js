(function() {

	"use strict";

	module.exports = function ( grunt ) {

	// Load plugins using matchdep
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

		// Task configuration.
		grunt.initConfig({

			pkg: grunt.file.readJSON('package.json'),

			build_dir: './dist',
			src_dir: './src',
			dest_js: 'scripts.js',
			dest_css: 'styles.css',

			js_include: '<%= src_dir %>/**/*.js',
			js_spec_exclude: '!<%= src_dir %>/**/*.spec.js',

			manifest: {
				src: '<%= src_dir %>',
				dest: '<%= build_dir %>/package.manifest',
				plugins_dir: '~/App_Plugins'
			},

			// Lint javascript
			jshint: {
				files: [
					'<%= js_include %>',
					'<%= js_spec_exclude %>'
				],
				options: {
					jshintrc: true
				}
			},

			uglify: {
				options: {
					banner: 'angular.module("umbraco", ["<%= pkg.name %>"]);'
				},
				build: {
					src: [
						'<%= js_include %>',
						'<%= js_spec_exclude %>'
					],
					dest: '<%= build_dir %>/<%= dest_js %>'
				}
			},

			karma: {
				unit: {
					configFile: 'karma.conf.js',
					background: true,
					runnerPort: 9999,
					logLevel: 'ERROR'
				},
				single: {
					configFile: 'karma.conf.js',
					runnerPort: 9999,
					singleRun: true,
					logLevel: 'ERROR'
				}
			},

			less: {
				options: {
					cleancss: true,
				},
				files: {
					expand: false,
					src: ['<%= src_dir %>/**/*.less'],
					dest: '<%= build_dir %>/<%= dest_css %>/'
				}
			},

			copy: {
				html: {
					expand: true,
					flatten: true,
					src: ['<%= src_dir %>/**/*.html', '!<%= src_dir %>/**/*.tpl.html'],
					dest: '<%= build_dir %>/'
				},
			},

			clean: ['<%= build_dir %>/'],

			// Watch file changes and trigger actions such as livereload, recompile etc
			watch: {
				options: {
					spawn: false
				},

				less: {
					files: ['<%= src_dir %>/**/*.less'],
					tasks: ['less']
				},

				scripts: {
					files: ['<%= js_include %>', '<%= js_spec_exclude %>'],
					tasks: ['js']
				},

				tests: {
					files: ['<%= js_include %>'],
					tasks: ['karma:unit:run']
				},
			},

			// Local dev static server
			connect: {
				dev: {
					options: {
						hostname: '*',
						port: 8001,
						base: './',
						keepalive: true,
						open: 'http://localhost:8001'
					}
				}
			}
		});

		grunt.registerTask('manifest', 'create an umbraco plugin manifest.', function() {

			var pluginsDir = grunt.config('manifest.plugins_dir'),
				moduleName = grunt.config('pkg.name').replace(/\./g, ' '),
				jsFile = grunt.config('dest_js'),
				cssFile = grunt.config('dest_css'),
				filepath = grunt.config('manifest.dest'),
				js = pluginsDir + '/' + moduleName + '/' + jsFile,
				css = pluginsDir + '/' + moduleName + '/' + cssFile,
				contents = '{'+
					'\n\tjavascript: ['+
					'\n\t\t"'+ js +'"'+
					'\n\t],'+
					'\n\tcss: ['+
					'\n\t\t"'+ css +'"'+
					'\n\t]'+
					'\n}';

			grunt.file.write(filepath, contents);
		});

		grunt.registerTask('js', ['jshint', 'uglify']);

		// Default task(s).
		grunt.registerTask('default', ['clean', 'copy', 'karma', 'js', 'less', 'manifest', 'watch']);
		
	};

}());