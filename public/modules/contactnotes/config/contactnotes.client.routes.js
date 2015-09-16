'use strict';

//Setting up route
angular.module('contactnotes').config(['$stateProvider',
	function($stateProvider) {
		// Contactnotes state routing
		$stateProvider.
		state('listContactnotes', {
			url: '/contactnotes',
			templateUrl: 'modules/contactnotes/views/list-contactnotes.client.view.html'
		}).
		state('createContactnote', {
			url: '/contactnotes/create',
			templateUrl: 'modules/contactnotes/views/create-contactnote.client.view.html'
		}).
		state('viewContactnote', {
			url: '/contactnotes/:contactnoteId',
			templateUrl: 'modules/contactnotes/views/view-contactnote.client.view.html'
		}).
		state('editContactnote', {
			url: '/contactnotes/:contactnoteId/edit',
			templateUrl: 'modules/contactnotes/views/edit-contactnote.client.view.html'
		});
	}
]);