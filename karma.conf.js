module.exports = function(config){
	config.set({

		basePath : './',

		files : [
			'vendor/angular/angular.js',
			'vendor/angular-mocks/angular-mocks.js',
			'src/**/*.js'
		],

		frameworks: ['jasmine'],

		browsers : ['Chrome'],

		plugins : [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-coverage'
		],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		},

		// coverage reporter generates the coverage
		reporters: ['progress', 'coverage'],

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'src/**/*.js': ['coverage']
		},

		// optionally, configure the reporter
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		}

	});
};