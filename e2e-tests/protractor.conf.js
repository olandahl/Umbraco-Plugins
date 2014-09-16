exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'src/**/*.sepc.js'
	],

	capabilities: {
		'browserName': 'chrome'
	},

	baseUrl: 'http://localhost:8000',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};