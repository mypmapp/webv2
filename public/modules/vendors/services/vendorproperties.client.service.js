'use strict';

angular.module('vendors').factory('VendorProperties', ['$resource',
function($resource) {
	return $resource('vendors/properties/:vendorId', { vendorId: '@vendorId'}, {});
}
]);
