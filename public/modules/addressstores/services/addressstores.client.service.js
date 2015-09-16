'use strict';

//Addressstores service used to communicate Addressstores REST endpoints
angular.module('addressstores').factory('Addressstores', ['$resource',
	function($resource) {
		return $resource('addressstores/:addressstoreId', { addressstoreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);