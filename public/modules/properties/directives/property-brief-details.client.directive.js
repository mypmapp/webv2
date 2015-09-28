'use strict';

angular.module('properties').directive('propertyBriefDetails', [
	function() {
		{
			return {
				templateUrl: '../modules/properties/views/property-brief-details.client.view.html',
				restrict: 'E',
				scope: {
					property: '=',
					templateOptions:'=to'
				},

				controller: function ($scope) {
					//console.log($scope.property);
					$scope.showVendorDetails=false;
					$scope.ToggleShowVendorDetails = function()
					{
						$scope.showVendorDetails = !$scope.showVendorDetails;

					};
				}
			};
		}
	}
]);
