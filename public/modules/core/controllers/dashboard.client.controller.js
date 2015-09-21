'use strict';

angular.module('core').controller('DashboardController',['$scope','$location', 'Authentication',
	function($scope,$location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

	}
]);
