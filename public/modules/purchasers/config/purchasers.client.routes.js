'use strict';

//Setting up route
angular.module('purchasers').config(['$stateProvider',
	function($stateProvider) {
		// Purchasers state routing
		$stateProvider.
		state('listPurchasers', {
			url: '/purchasers',
			templateUrl: 'modules/purchasers/views/list-purchasers.client.view.html'
		}).
		state('createPurchaser', {
			url: '/purchasers/create',
			templateUrl: 'modules/purchasers/views/create-purchaser.client.view.html'
		}).
		state('viewPurchaser', {
			url: '/purchasers/:purchaserId',
			templateUrl: 'modules/purchasers/views/view-purchaser.client.view.html'
		}).
		state('editPurchaser', {
			url: '/purchasers/:purchaserId/edit',
			templateUrl: 'modules/purchasers/views/edit-purchaser.client.view.html'
		});
	}
]);
