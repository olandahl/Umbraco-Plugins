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

		manifest: {
			src: '<%= src_dir %>',
			dest: '<%= build_dir %>/package.manifest',
			plugins_dir: '~/App_Plugins'
		},

		uglify: {
			options: {
				banner: 'angular.module("umbraco", ["<%= pkg.name %>"]);'
			},
			build: {
				src: [
					'<%= src_dir %>/**/*.js',
					'!<%= src_dir %>/**/*.spec.js'
				],
				dest: '<%= build_dir %>/<%= dest_js %>'
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

		clean: ['<%= build_dir %>/']
	});

	grunt.registerTask('manifest', 'create an umbraco plugin manifest.', function() {

		var pluginsDir = grunt.config('manifest.plugins_dir'),
			moduleName = grunt.config('pkg.name').replace(/\./g, ' '),
			jsFile = grunt.config('dest_js'),
			cssFile = grunt.config('dest_css'),
			filepath = grunt.config('manifest.dest'),
			js = pluginsDir + '/' + moduleName + '/' + jsFile,
			css = pluginsDir + '/' + moduleName + '/' + cssFile;
			contents = '{'+
				'\n\tjavascript: ['+
				'\n\t\t"'+ js +'"'+
				'\n\t],'+
				'\n\tcss: ['+
				'\n\t\t"'+ css +'"'+
				'\n\t]'+
				'\n}';

		grunt.file.write(filepath, contents)
	});

	// Default task(s).
	grunt.registerTask('default', ['clean', 'uglify', 'less', 'manifest']);
	
};