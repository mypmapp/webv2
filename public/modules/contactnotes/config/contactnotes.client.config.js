'use strict';

// Configuring the Articles module
angular.module('contactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contactnotes', 'contactnotes', 'dropdown', '/contactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'contactnotes', 'List Contactnotes', 'contactnotes');
		Menus.addSubMenuItem('topbar', 'contactnotes', 'New Contactnote', 'contactnotes/create');
	}
]);