'use strict';

// // Vendors controller
angular.module('vendors').controller('VendorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vendors','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Vendors, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.addressFindOptions = {
			country: 'gb',
			//types: 'establishment'
		};

		$scope.CallBackFinishSearch = function(mode) {
			//console.log('Do Something, I am called, Mod:=' + mode);
			//console.log($scope.address.FormattedAddress);
			if(mode!='edit')
			{
				if($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
				if($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
				if($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
				if($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
				if($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
				if($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
			}
			else
			{
				if($scope.address.FormattedAddress.Unit) $scope.vendor.addressLine1 = $scope.address.FormattedAddress.Unit;
				if($scope.address.FormattedAddress.Street) $scope.vendor.addressLine2 = $scope.address.FormattedAddress.Street;
				if($scope.address.FormattedAddress.Town) $scope.vendor.addressLine3 = $scope.address.FormattedAddress.Town;
				if($scope.address.FormattedAddress.County) $scope.vendor.addressLine4 = $scope.address.FormattedAddress.County;
				if($scope.address.FormattedAddress.PostCode) $scope.vendor.postcode = $scope.address.FormattedAddress.PostCode;
				if($scope.address.FormattedAddress.Country) $scope.vendor.country = $scope.address.FormattedAddress.Country;
			}

		};

		$scope.saveState = function() {
			var deferred = $q.defer();
			console.log('in save stage');
			$timeout(function() {
				deferred.resolve();
			}, 5000);

			return deferred.promise;
		};

		$scope.completeWizard = function(mode) {

			if(mode==='new')
			{
				$scope.create();
			}
			else
			{
				$scope.update();
			}
		};


		// Create new Vendor
		$scope.create = function() {
			// Create new Vendor object
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

		// Remove existing Vendor
		$scope.remove = function(vendor) {
			if ( vendor ) {
				vendor.$remove();

				for (var i in $scope.vendors) {
					if ($scope.vendors [i] === vendor) {
						$scope.vendors.splice(i, 1);
					}
				}
			} else {
				$scope.vendor.$remove(function() {
					$location.path('vendors');
				});
			}
		};

		// Update existing Vendor
		$scope.update = function() {
			var vendor = $scope.vendor;

			vendor.$update(function() {
				$location.path('vendors/' + vendor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vendors
		$scope.find = function() {
			$scope.vendors = Vendors.query();
		};

		// Find existing Vendor
		$scope.findOne = function() {
			$scope.vendor = Vendors.get({
				vendorId: $stateParams.vendorId
			});
		};
	}
]);
