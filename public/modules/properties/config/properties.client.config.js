'use strict';

// Configuring the Articles module
angular.module('properties').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Properties', 'properties', 'dropdown', '/properties(/create)?');
		Menus.addSubMenuItem('topbar', 'properties', 'List Properties', 'properties');
		Menus.addSubMenuItem('topbar', 'properties', 'New Property', 'properties/create');
	}
]);