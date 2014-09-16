module.exports = function(config){
	config.set({

		basePath : './',

		files : [
			'vendor/angular/angular.js',
			'vendor/angular-mocks/angular-mocks.js',
			'src/**/*.js'
		],

		autoWatch : true,

		frameworks: ['jasmine'],

		browsers : ['Chrome'],

		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};