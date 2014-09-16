module.exports = function ( grunt ) {

	// Load plugins using matchdep
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Task configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		pkg_name: grunt.option("package"),

		build_dir: './dist/<%= pkg_name %>',

		src_dir: './src/packages/<%= pkg_name %>',

		manifest: {
			dest: '<%= build_dir %>/package.manifest',
			plugins_dir: '~/App_Plugins',
			plugin_name: '<%= pkg_name %>'
		},

		uglify: {
			options: {
				banner: 'angular.module("umbraco", ["<%= pkg_name %>"]);'
			},
			build: {
				src: [
					'<%= src_dir %>/*.js',
					'!<%= src_dir %>/*.spec.js',
				],
				dest: '<%= build_dir %>/script.js'
			}
		}
	});

	function removeWhitespace(text) {
		return text.replace(/\s/, '');
	};

	grunt.registerTask('manifest', 'create an umbraco plugin manifest.', function() {

		var pluginsDir = grunt.config('manifest.plugins_dir'),
			pluginName = grunt.config('manifest.plugin_name'),
			filepath = grunt.config('manifest.dest'),
			view = pluginsDir + '/' + pluginName + '/view.html',
			script = pluginsDir + '/' + pluginName + '/script.js',
			styles = pluginsDir + '/' + pluginName + '/styles.css';
			contents = '{'+
				'\n\tpropertyEditors: ['+
				'\n\t\t{'+
				'\n\t\t\talias:"'+ pluginName.replace(/\s/, '') +'",'+
				'\n\t\t\tname:"'+ pluginName +'",'+
				'\n\t\t\teditor: {'+
				'\n\t\t\t\tview: "'+ view +'",'+
				'\n\t\t\t\tvalueType: "JSON"'+
				'\n\t\t\t}'+
				'\n\t\t}'+
				'\n\t],'+
				'\n\tjavascript: ['+
				'\n\t\t"'+ script +'"'+
				'\n\t],'+
				'\n\tcss: ['+
				'\n\t\t"'+ styles +'"'+
				'\n\t]'+
				'\n}';

		grunt.file.write(filepath, contents)
	});

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'manifest']);
	
};