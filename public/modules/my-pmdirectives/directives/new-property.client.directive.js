'use strict';

angular.module('my-pmdirectives').directive('newProperty', [
	function() {
		return {
			templateUrl: '../modules/my-pmdirectives/views/new-property.client.view.html',
			restrict: 'E',
			controller: function ($scope) {

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
				};

			}
		};
	}
]);
