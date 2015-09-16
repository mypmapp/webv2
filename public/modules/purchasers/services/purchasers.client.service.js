'use strict';

//Purchasers service used to communicate Purchasers REST endpoints
angular.module('purchasers').factory('Purchasers', ['$resource',
	function($resource) {
		return $resource('purchasers/:purchaserId', { purchaserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);