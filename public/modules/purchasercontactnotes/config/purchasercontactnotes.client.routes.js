'use strict';

//Setting up route
angular.module('purchasercontactnotes').config(['$stateProvider',
	function($stateProvider) {
		// Purchasercontactnotes state routing
		$stateProvider.
			state('listPurchasercontactnotes', {
				url: '/notes/purchasers',
				templateUrl: 'modules/purchasercontactnotes/views/list-purchasercontactnotes.client.view.html'
			}).
			state('createPurchasercontactnote', {
				url: '/notes/purchasers/:purchaserId/create',
				templateUrl: 'modules/purchasercontactnotes/views/create-purchasercontactnote.client.view.html'
			}).
			state('purchaserNotesView', {
				url: '/notes/purchasers/:purchaserId/view',
				templateUrl: 'modules/purchasercontactnotes/views/view-purchasercontactnote.client.view.html'
			});
	}
]);
