'use strict';

// Contactnotes controller
angular.module('contactnotes').controller('ContactnotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contactnotes',
	function($scope, $stateParams, $location, Authentication, Contactnotes) {
		$scope.authentication = Authentication;

		// Create new Contactnote
		$scope.create = function() {
			// Create new Contactnote object
			var contactnote = new Contactnotes ({
				name: this.name
			});

			// Redirect after save
			contactnote.$save(function(response) {
				$location.path('contactnotes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contactnote
		$scope.remove = function(contactnote) {
			if ( contactnote ) { 
				contactnote.$remove();

				for (var i in $scope.contactnotes) {
					if ($scope.contactnotes [i] === contactnote) {
						$scope.contactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.contactnote.$remove(function() {
					$location.path('contactnotes');
				});
			}
		};

		// Update existing Contactnote
		$scope.update = function() {
			var contactnote = $scope.contactnote;

			contactnote.$update(function() {
				$location.path('contactnotes/' + contactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contactnotes
		$scope.find = function() {
			$scope.contactnotes = Contactnotes.query();
		};

		// Find existing Contactnote
		$scope.findOne = function() {
			$scope.contactnote = Contactnotes.get({ 
				contactnoteId: $stateParams.contactnoteId
			});
		};
	}
]);