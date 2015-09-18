'use strict';

// Purchasers controller
angular.module('purchasers').controller('PurchasersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Purchasers','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Purchasers, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.CallBackFinishSearch = function(mode) {
			console.log('Do Something, I am called, Mod:=' + mode);
			console.log($scope.address.FormattedAddress);
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
				if($scope.address.FormattedAddress.Unit) $scope.purchaser.addressLine1 = $scope.address.FormattedAddress.Unit;
				if($scope.address.FormattedAddress.Street) $scope.purchaser.addressLine2 = $scope.address.FormattedAddress.Street;
				if($scope.address.FormattedAddress.Town) $scope.purchaser.addressLine3 = $scope.address.FormattedAddress.Town;
				if($scope.address.FormattedAddress.County) $scope.purchaser.addressLine4 = $scope.address.FormattedAddress.County;
				if($scope.address.FormattedAddress.PostCode) $scope.purchaser.postcode = $scope.address.FormattedAddress.PostCode;
				if($scope.address.FormattedAddress.Country) $scope.purchaser.country = $scope.address.FormattedAddress.Country;
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

		// Create new Purchaser
		$scope.create = function() {
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

		// Remove existing Purchaser
		$scope.remove = function(purchaser) {
			if ( purchaser ) { 
				purchaser.$remove();

				for (var i in $scope.purchasers) {
					if ($scope.purchasers [i] === purchaser) {
						$scope.purchasers.splice(i, 1);
					}
				}
			} else {
				$scope.purchaser.$remove(function() {
					$location.path('purchasers');
				});
			}
		};

		// Update existing Purchaser
		$scope.update = function() {
			var purchaser = $scope.purchaser;

			purchaser.$update(function() {
				$location.path('purchasers/' + purchaser._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Purchasers
		$scope.find = function() {
			$scope.purchasers = Purchasers.query();
		};

		// Find existing Purchaser
		$scope.findOne = function() {
			$scope.purchaser = Purchasers.get({ 
				purchaserId: $stateParams.purchaserId
			});
		};
	}
]);
