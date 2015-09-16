'use strict';

// // Vendors controller
angular.module('vendors').controller('VendorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vendors','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Vendors, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//Gravatar
		$scope.options = {
			secure: true,
			size: 150,
			defaultImage: 'mm'
		};

		//Google Places

		$scope.result = ''
		//    $scope.details = ''
		$scope.optionsG = {};

		$scope.form = {
			type: 'geocode',
			bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
			country: 'ca',
			typesEnabled: false,
			boundsEnabled: false,
			componentEnabled: false,
			watchEnter: true
		}

		//set options from form selections
		$scope.checkForm = function() {

			$scope.optionsG = {};

			$scope.optionsG.watchEnter = $scope.form.watchEnter

			if ($scope.form.typesEnabled) {
				$scope.optionsG.types = $scope.form.type
			}
			if ($scope.form.boundsEnabled) {

				var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng)
				var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng)
				var bounds = new google.maps.LatLngBounds(SW, NE);
				$scope.optionsG.bounds = bounds

			}
			if ($scope.form.componentEnabled) {
				$scope.optionsG.country = $scope.form.country
			}
		};

		//watch form for changes
		$scope.watchForm = function () {
			return $scope.form
		};
		$scope.$watch($scope.watchForm, function () {
			$scope.checkForm()
		}, true);



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
				postcode:$scope.postalCode,
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
