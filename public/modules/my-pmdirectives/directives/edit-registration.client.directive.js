'use strict';

angular.module('my-pmdirectives').directive('editRegistration', ['Vendors','Purchasers','$location',
	function(Vendors,Purchasers,$location) {
		return {
			templateUrl: '../modules/my-pmdirectives/views/edit-registration.client.view.html',
			restrict: 'E',
			scope: {
				customer: '=',
				templateOptions:'=to'
			},

			controller: function ($scope) {
				$scope.update = function()
				{
					$scope.$broadcast('show-errors-check-validity');
					if ($scope.regEditForm.$invalid) { return; }

					if($scope.templateOptions.customerType==='vendor')
					{
						$scope.updateVendor();
					}

					if($scope.templateOptions.customerType==='purchaser')
					{
						$scope.updatePurchaser();
					}
				};

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.customer.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.customer.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.customer.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.customer.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.customer.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.customer.country = $scope.address.FormattedAddress.Country;
				};


				// Update existing Vendor
				$scope.updateVendor = function() {

					var vendor = new Vendors (
						{
							_id: $scope.customer._id,
							title: $scope.customer.title,
							firstName: $scope.customer.firstName,
							lastName: $scope.customer.lastName,
							phonePrimary: $scope.customer.phonePrimary,
							phoneSecondary: $scope.customer.phoneSecondary,
							emailPrimary: $scope.customer.emailPrimary,
							emailSecondary: $scope.customer.emailSecondary,
							addressLine1: $scope.customer.addressLine1,
							addressLine2: $scope.customer.addressLine2,
							addressLine3: $scope.customer.addressLine3,
							addressLine4: $scope.customer.addressLine4,
							postcode: $scope.customer.postcode,
							country: $scope.customer.country
						}
					);

					vendor.$update(function() {
						$location.path('vendors/' + vendor._id);
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

				// Update existing Purchaser
				$scope.updatePurchaser = function() {
					var purchaser = new Purchasers (
						{
							_id: $scope.customer._id,
							title: $scope.customer.title,
							firstName: $scope.customer.firstName,
							lastName: $scope.customer.lastName,
							phonePrimary: $scope.customer.phonePrimary,
							phoneSecondary: $scope.customer.phoneSecondary,
							emailPrimary: $scope.customer.emailPrimary,
							emailSecondary: $scope.customer.emailSecondary,
							addressLine1: $scope.customer.addressLine1,
							addressLine2: $scope.customer.addressLine2,
							addressLine3: $scope.customer.addressLine3,
							addressLine4: $scope.customer.addressLine4,
							postcode: $scope.customer.postcode,
							country: $scope.customer.country
						}
					);

					purchaser.$update(function() {
						$location.path('purchasers/' + purchaser._id);
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

			}
		};
	}
]);
