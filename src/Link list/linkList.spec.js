describe('A Grid Editor', function(){

	"use strict";

	var scope, ctrl,
		ctrlAlias = 'Custom.Grid.Editors.LinkListCtrl',
		emptyLink = createLink('', '', ''),
		testLink1 = createLink('link1', 'http://www.link1-url.com', 'icon1'),
		testLink2 = createLink('link2', 'http://www.link2-url.com', 'icon2'),
		testLink3 = createLink('link3', 'http://www.link3-url.com', 'icon3'),
		testList = [ testLink1, testLink2, testLink3 ];

	beforeEach(function() {
		module('Custom.Grid.Editors');
	});

	describe('Link List, which is empty', function(){
		
		beforeEach(inject(function($controller) {
			scope = {
				control: {
					value: null
				}
			};
			ctrl = $controller(ctrlAlias, {$scope:scope});
		}));

		it('should have a controller', function($controller) {
			expect(ctrl).not.toBe(null);
		});

		it('should have an empty list', function($controller) {
			expect(scope.control.value.length).toBe(0);
			expect(scope.isEmpty()).toBe(true);
		});

		describe('and an empty link is added', function() {

			beforeEach(function() {
				scope.addLink();
			});

			it('it should have one link in the list', function() {
				expect(scope.control.value.length).toBe(1);
				expect(scope.isEmpty()).toBe(false);
				expect(scope.control.value[0].title).toBe('');
				expect(scope.control.value[0].url).toBe('');
				expect(scope.control.value[0].icon).toBe('');
			});

			it('the link should not be valid', function() {
				expect(scope.isLastItemValid()).toBe(false);
			});
		});

		describe('and a link is added', function() {

			beforeEach(function() {
				scope.addLink(testLink1);
			});

			it('should have one link in the list', function() {
				expect(scope.control.value.length).toBe(1);
				expect(scope.isEmpty()).toBe(false);
				expect(scope.control.value[0]).toEqual(testLink1);
			});

			it('the link should be valid', function() {
				expect(scope.isLastItemValid()).toBe(true);
			});

			describe('and removed', function() {

				beforeEach(function() {
					scope.removeLink(testLink1);
				});

				it('should have an empty list', function($controller) {
					expect(scope.control.value.length).toBe(0);
					expect(scope.isEmpty()).toBe(true);
				});
			});
		});
	});

	describe('Link List, which contain link objects', function(){

		beforeEach(inject(function($controller) {
			scope = {
				control: {
					value: testList
				}
			};
			ctrl = $controller(ctrlAlias, {$scope:scope});
		}));

		it('should have a controller', function($controller) {
			expect(ctrl).not.toBe(null);
		});

		it('should have three links in the list', function($controller) {
			expect(scope.control.value.length).toBe(3);
		});
	});

	function createLink(title, url, icon) {
		return {
			title:title, 
			url: url, 
			icon: icon
		};
	}
});