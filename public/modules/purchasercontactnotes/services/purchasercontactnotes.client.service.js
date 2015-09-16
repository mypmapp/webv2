'use strict';

//Purchasercontactnotes service used to communicate Purchasercontactnotes REST endpoints
angular.module('purchasercontactnotes').factory('Purchasercontactnotes', ['$resource',
	function($resource) {
		return $resource('purchasercontactnotes/:purchasercontactnoteId', { purchasercontactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);