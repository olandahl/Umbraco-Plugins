(function() {

	'use strict';

	angular.module('Custom.Grid.Editors', [])

	.controller('Custom.Grid.Editors.LinkListCtrl', ['$scope', function ($scope) {

		if (!$scope.control) {
			$scope.control = {};
		}

		if (!$scope.control.value) {
			$scope.control.value = [];
		}

		$scope.addLink = function (link) {
			$scope.control.value.push({
				title: link ? link.title : '',
				url: link ? link.url : '',
				icon: link ? link.icon : ''
			});
		};

		$scope.removeLink = function () {
			$scope.control.value.pop();
		};

		$scope.isEmpty = function() {
			return $scope.control.value.length === 0;
		};

		$scope.isLastItemValid = function() {
			var linkCount = $scope.control.value.length;
			return linkCount === 0 || 
			($scope.control.value[linkCount - 1].title.length > 0 && 
				$scope.control.value[linkCount - 1].url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) !== null &&
				$scope.control.value[linkCount - 1].icon.length > 0);
		};

	} ]);

}());