'use strict';

//Setting up route
angular.module('addressstores').config(['$stateProvider',
	function($stateProvider) {
		// Addressstores state routing
		$stateProvider.
		state('listAddressstores', {
			url: '/addressstores',
			templateUrl: 'modules/addressstores/views/list-addressstores.client.view.html'
		}).
		state('createAddressstore', {
			url: '/addressstores/create',
			templateUrl: 'modules/addressstores/views/create-addressstore.client.view.html'
		}).
		state('viewAddressstore', {
			url: '/addressstores/:addressstoreId',
			templateUrl: 'modules/addressstores/views/view-addressstore.client.view.html'
		}).
		state('editAddressstore', {
			url: '/addressstores/:addressstoreId/edit',
			templateUrl: 'modules/addressstores/views/edit-addressstore.client.view.html'
		});
	}
]);