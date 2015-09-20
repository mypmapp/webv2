'use strict';

// // Vendors controller
angular.module('vendors').controller('VendorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vendors','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Vendors, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//// Remove existing Vendor
		//$scope.remove = function(vendor) {
		//	if ( vendor ) {
		//		vendor.$remove();
        //
		//		for (var i in $scope.vendors) {
		//			if ($scope.vendors [i] === vendor) {
		//				$scope.vendors.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.vendor.$remove(function() {
		//			$location.path('vendors');
		//		});
		//	}
		//};

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
