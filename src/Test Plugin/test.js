(function() {

	"use strict";

	angular.module("Custom.Grid.Editors", [])

	.controller("LinkList", ["$scope", function ($scope) {

		if (!$scope.model) {
			$scope.model = {};
		}

		if (!$scope.model.value) {
			$scope.model.value = [];
		}

		$scope.addLink = function () {
			$scope.model.value.push({name: "", url: ""});
		};

		$scope.removeLink = function () {
			$scope.model.value.pop();
		};

		$scope.isEmpty = function() {
			return $scope.model.value.length === 0;
		};

		$scope.isLastItemValid = function() {
			var linkCount = $scope.model.value.length;
			return linkCount === 0 || 
			($scope.model.value[linkCount - 1].name.length > 0 && $scope.model.value[linkCount - 1].url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/));
		};

	} ])

	.directive("testPartialOne", function() {
		return {
			restrict: "E",
			templateUrl: "test-partial1.tpl.html"
		};
	})

	.directive("testPartialTwo", function() {
		return {
			restrict: "E",
			templateUrl: "test-partial2.tpl.html"
		};
	});

}());