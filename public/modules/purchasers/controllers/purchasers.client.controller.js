'use strict';

// Purchasers controller
angular.module('purchasers').controller('PurchasersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Purchasers','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Purchasers, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Remove existing Purchaser
		//$scope.remove = function(purchaser) {
		//	if ( purchaser ) {
		//		purchaser.$remove();
        //
		//		for (var i in $scope.purchasers) {
		//			if ($scope.purchasers [i] === purchaser) {
		//				$scope.purchasers.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.purchaser.$remove(function() {
		//			$location.path('purchasers');
		//		});
		//	}
		//};
		//

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
