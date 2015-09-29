'use strict';

angular.module('properties').controller('UploadPropertyImagesControllerController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Properties', 'Vendors',
	function ($scope, $stateParams, $location, $http, Authentication, Properties, Vendors) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Find existing Property
		$scope.findOne = function () {
			$scope.property = Properties.get({
				propertyId: $stateParams.propertyId
			});
			$scope.enableSave = true;
			//console.log($scope.property);
		};
	}
]);
