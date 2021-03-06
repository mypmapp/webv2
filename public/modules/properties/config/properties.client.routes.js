'use strict';

//Setting up route
angular.module('properties').config(['$stateProvider',
	function($stateProvider) {
		// Properties state routing
		$stateProvider.
		state('upload-property-images', {
			url: '/properties/:propertyId/Upload/Images/New',
			templateUrl: 'modules/properties/views/upload-property-images.client.view.html'
		}).
		state('listProperties', {
			url: '/properties',
			templateUrl: 'modules/properties/views/list-properties.client.view.html'
		}).
		state('createProperty', {
			url: '/properties/vendors/:vendorId/create',
			templateUrl: 'modules/properties/views/create-property.client.view.html'
		}).
		state('viewProperty', {
			url: '/properties/:propertyId',
			templateUrl: 'modules/properties/views/view-property.client.view.html'
		}).
		state('editProperty', {
			url: '/properties/:propertyId/edit',
			templateUrl: 'modules/properties/views/edit-property.client.view.html'
		});
	}
]);
