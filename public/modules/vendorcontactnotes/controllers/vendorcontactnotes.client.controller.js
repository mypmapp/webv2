'use strict';

// Vendorcontactnotes controller
angular.module('vendorcontactnotes').controller('VendorcontactnotesController', ['$scope', '$stateParams', '$location', 'Authentication','Vendors', 'Vendorcontactnotes',
	function($scope, $stateParams, $location, Authentication,Vendors, Vendorcontactnotes) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');


		// Create new Vendorcontactnote
		$scope.create = function() {
			console.log('Vendor Details'+$scope.vendor);
			// Create new Vendorcontactnote object
			var vendorcontactnote = new Vendorcontactnotes ({
				notes: this.htmlVariable,
				vendor:$scope.vendor._id,
			});

			// Redirect after save
			vendorcontactnote.$save(function(response) {
				$location.path('notes/vendors/'+ $scope.vendor._id+'/view');
				// Clear form fields
				$scope.htmlVariable = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vendorcontactnote
		$scope.remove = function(vendorcontactnote) {
			if ( vendorcontactnote ) { 
				vendorcontactnote.$remove();

				for (var i in $scope.vendorcontactnotes) {
					if ($scope.vendorcontactnotes [i] === vendorcontactnote) {
						$scope.vendorcontactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.vendorcontactnote.$remove(function() {
					$location.path('vendorcontactnotes');
				});
			}
		};

		// Update existing Vendorcontactnote
		$scope.update = function() {
			var vendorcontactnote = $scope.vendorcontactnote;

			vendorcontactnote.$update(function() {
				$location.path('vendorcontactnotes/' + vendorcontactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vendorcontactnotes
		$scope.find = function() {
			$scope.vendorcontactnotes = Vendorcontactnotes.query();
			console.log($scope.vendorcontactnotes);
		};

		// Find existing Vendorcontactnote
		$scope.findOne = function() {
			$scope.vendorcontactnote = Vendorcontactnotes.get({ 
				vendorcontactnoteId: $stateParams.vendorcontactnoteId

			});
			console.log($scope.vendorcontactnote);
		};

		// Find existing Vendor
		$scope.findVendorOne = function() {
			$scope.vendor = Vendors.get({
				vendorId: $stateParams.vendorId
			});
		};

		//Find All Vendors
		$scope.findAllVendor = function() {
			$scope.vendors = Vendors.query();
		};

	}
]);
