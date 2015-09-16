'use strict';

angular.module('my-pmdirectives').directive('customerBriefDetails', [
	function() {
		return {
			templateUrl: '../modules/my-pmdirectives/views/customer-brief-details.client.view.html',
			restrict: 'E',
			scope: {
				customer: '=',
				templateOptions:'=to'
			},

			controller: function ($scope) {
				$scope.options = {
					secure: true,
					size: 150,
					defaultImage: 'mm'
				};
			}
		};
	}
]);
