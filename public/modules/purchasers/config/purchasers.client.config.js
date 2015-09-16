'use strict';

// Configuring the Articles module
angular.module('purchasers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Purchasers', 'purchasers', 'dropdown', '/purchasers(/create)?');
		Menus.addSubMenuItem('topbar', 'purchasers', 'List Purchasers', 'purchasers');
		Menus.addSubMenuItem('topbar', 'purchasers', 'New Purchaser', 'purchasers/create');
	}
]);