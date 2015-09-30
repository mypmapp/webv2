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

					if($scope.property)
					{
						if(!angular.isUndefined($scope.property.chainType))
						{
							lookupTypes.findChainType($scope.property.chainType, function(retVal) {
								$scope.property.chainType = retVal.name;
							});
						}

						if(!angular.isUndefined($scope.property.propertyType))
						{
							lookupTypes.findPropertyType($scope.property.propertyType, function(retVal) {
								$scope.property.propertyType = retVal.name;
							});
						}

						if(!angular.isUndefined($scope.property.tenureType))
						{
							lookupTypes.findTenureType($scope.property.tenureType, function(retVal) {
								$scope.property.tenureType = retVal.name;
							});
						}
					}

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
