'use strict';

// Configuring the Articles module
angular.module('vendorcontactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vendorcontactnotes', 'vendorcontactnotes', 'dropdown', '/vendorcontactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'vendorcontactnotes', 'List Vendorcontactnotes', 'vendorcontactnotes');
		Menus.addSubMenuItem('topbar', 'vendorcontactnotes', 'New Vendorcontactnote', 'vendorcontactnotes/create');
	}
]);