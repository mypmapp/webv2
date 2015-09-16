'use strict';

//Contactnotes service used to communicate Contactnotes REST endpoints
angular.module('contactnotes').factory('Contactnotes', ['$resource',
	function($resource) {
		return $resource('contactnotes/:contactnoteId', { contactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);