'use strict';

angular.module('properties').directive('propertyBriefDetails', ['lookupTypes',
	function(lookupTypes) {
		{
			return {
				templateUrl: '../modules/properties/views/property-brief-details.client.view.html',
				restrict: 'E',
				scope: {
					property: '=',
					templateOptions:'=to'
				},

				controller: function ($scope) {

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
