describe('Link List', function(){

	"use strict";

	beforeEach(module('Custom.Grid.Editors'));

	it('should have an empty model value array', inject(function($controller) {
		var scope = {},
		ctrl = $controller('LinkList', {$scope:scope});

		expect(scope.model.value.length).toBe(0);
		expect(ctrl).not.toBe(null);
	}));

});