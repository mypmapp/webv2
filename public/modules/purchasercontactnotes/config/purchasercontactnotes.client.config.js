'use strict';

// Configuring the Articles module
angular.module('purchasercontactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Purchasercontactnotes', 'purchasercontactnotes', 'dropdown', '/purchasercontactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'purchasercontactnotes', 'List Purchasercontactnotes', 'purchasercontactnotes');
		Menus.addSubMenuItem('topbar', 'purchasercontactnotes', 'New Purchasercontactnote', 'purchasercontactnotes/create');
	}
]);