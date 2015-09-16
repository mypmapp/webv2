'use strict';

// Purchasercontactnotes controller
angular.module('purchasercontactnotes').controller('PurchasercontactnotesController', ['$scope', '$stateParams', '$location', 'Authentication','Purchasers', 'Purchasercontactnotes',
	function($scope, $stateParams, $location, Authentication,Purchasers, Purchasercontactnotes) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.options = {
			secure: true,
			size: 150,
			defaultImage: 'mm'
		};

		// Create new Purchasercontactnote
		$scope.create = function() {
			// Create new Purchasercontactnote object
			var purchasercontactnote = new Purchasercontactnotes ({
				notes: this.htmlVariable,
				purchaser:$scope.purchaser._id,
			});

			// Redirect after save
			purchasercontactnote.$save(function(response) {
				$location.path('notes/purchasers/'+ $scope.purchaser._id+'/view');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Purchasercontactnote
		$scope.remove = function(purchasercontactnote) {
			if ( purchasercontactnote ) {
				purchasercontactnote.$remove();

				for (var i in $scope.purchasercontactnotes) {
					if ($scope.purchasercontactnotes [i] === purchasercontactnote) {
						$scope.purchasercontactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.purchasercontactnote.$remove(function() {
					$location.path('purchasercontactnotes');
				});
			}
		};

		// Update existing Purchasercontactnote
		$scope.update = function() {
			var purchasercontactnote = $scope.purchasercontactnote;

			purchasercontactnote.$update(function() {
				$location.path('purchasercontactnotes/' + purchasercontactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Purchasercontactnotes
		$scope.find = function() {
			$scope.purchasercontactnotes = Purchasercontactnotes.query();
		};

		// Find existing Purchasercontactnote
		$scope.findOne = function() {
			$scope.purchasercontactnote = Purchasercontactnotes.get({
				purchasercontactnoteId: $stateParams.purchasercontactnoteId
			});
		};

		// Find a list of Purchasers
		$scope.findAllPurchasers = function() {
			$scope.purchasers = Purchasers.query();
		};

		// Find existing Purchaser
		$scope.findPurchaserOne = function() {
			$scope.purchaser = Purchasers.get({
				purchaserId: $stateParams.purchaserId
			});
		};
	}
]);
