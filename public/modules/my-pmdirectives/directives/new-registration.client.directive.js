'use strict';

angular.module('my-pmdirectives').directive('newRegistration', ['Vendors','Purchasers','$location',
	function(Vendors,Purchasers,$location) {
		return {
			templateUrl: '../modules/my-pmdirectives/views/new-registration.client.view.html',
			restrict: 'E',
			scope: {
				templateOptions:'=to'
			},

			controller: function ($scope) {

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
				};

				$scope.create = function()
				{
					console.log('Create Called Do Something');
					if($scope.templateOptions.customerType==='vendor')
					{
						$scope.createVendor();
					}

					if($scope.templateOptions.customerType==='purchaser')
					{
						$scope.createPurchaser();
					}

				}

				// Create new Vendor
				$scope.createVendor = function() {
					// Create new Vendor object
					console.log('Create Vendor Called');
					var vendor = new Vendors ({
						title: $scope.title,
						firstName: $scope.firstName,
						lastName:$scope.lastName,
						phonePrimary:$scope.phonePrimary,
						phoneSecondary:$scope.phoneSecondary,
						emailPrimary:$scope.emailPrimary,
						emailSecondary:$scope.emailSecondary,
						addressLine1:$scope.addressLine1,
						addressLine2:$scope.addressLine2,
						addressLine3:$scope.addressLine3,
						addressLine4:$scope.addressLine4,
						postcode:$scope.postcode,
						country:$scope.country
					});

					// Redirect after save
					vendor.$save(function(response) {
						$location.path('vendors/' + response._id);

						// Clear form fields
						$scope.firstName = '';
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

				// Create new Purchaser
				$scope.createPurchaser = function() {
					// Create new Purchaser object
					var purchaser = new Purchasers ({
						title: $scope.title,
						firstName: $scope.firstName,
						lastName:$scope.lastName,
						phonePrimary:$scope.phonePrimary,
						phoneSecondary:$scope.phoneSecondary,
						emailPrimary:$scope.emailPrimary,
						emailSecondary:$scope.emailSecondary,
						addressLine1:$scope.addressLine1,
						addressLine2:$scope.addressLine2,
						addressLine3:$scope.addressLine3,
						addressLine4:$scope.addressLine4,
						postcode:$scope.postcode,
						country:$scope.country
					});

					// Redirect after save
					purchaser.$save(function(response) {
						$location.path('purchasers/' + response._id);

						// Clear form fields
						$scope.name = '';
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};
			}
		};
	}
]);
