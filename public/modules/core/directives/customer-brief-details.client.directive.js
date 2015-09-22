'use strict';

angular.module('core').directive('customerBriefDetails', [
	function() {
		return {
			templateUrl: '../modules/core/views/customer-brief-details.client.view.html',
			restrict: 'E',
			scope: {
				customer: '=',
				templateOptions:'=to'
			},

			controller: function ($scope) {
				//console.log($scope.templateOptions.customerType);
			}
		};
	}
]);
