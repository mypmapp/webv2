'use strict';

// Addressstores controller
angular.module('addressstores').controller('AddressstoresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addressstores',
	function($scope, $stateParams, $location, Authentication, Addressstores) {
		$scope.authentication = Authentication;

		// Create new Addressstore
		$scope.create = function() {
			// Create new Addressstore object
			var addressstore = new Addressstores ({
				name: this.name
			});

			// Redirect after save
			addressstore.$save(function(response) {
				$location.path('addressstores/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Addressstore
		$scope.remove = function(addressstore) {
			if ( addressstore ) { 
				addressstore.$remove();

				for (var i in $scope.addressstores) {
					if ($scope.addressstores [i] === addressstore) {
						$scope.addressstores.splice(i, 1);
					}
				}
			} else {
				$scope.addressstore.$remove(function() {
					$location.path('addressstores');
				});
			}
		};

		// Update existing Addressstore
		$scope.update = function() {
			var addressstore = $scope.addressstore;

			addressstore.$update(function() {
				$location.path('addressstores/' + addressstore._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Addressstores
		$scope.find = function() {
			$scope.addressstores = Addressstores.query();
		};

		// Find existing Addressstore
		$scope.findOne = function() {
			$scope.addressstore = Addressstores.get({ 
				addressstoreId: $stateParams.addressstoreId
			});
		};
	}
]);