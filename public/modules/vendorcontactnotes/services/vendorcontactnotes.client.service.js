'use strict';

//Vendorcontactnotes service used to communicate Vendorcontactnotes REST endpoints
angular.module('vendorcontactnotes').factory('Vendorcontactnotes', ['$resource',
	function($resource) {
		return $resource('vendorcontactnotes/:vendorcontactnoteId', { vendorcontactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);