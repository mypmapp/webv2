'use strict';

// Configuring the Articles module
angular.module('addressstores').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Addressstores', 'addressstores', 'dropdown', '/addressstores(/create)?');
		Menus.addSubMenuItem('topbar', 'addressstores', 'List Addressstores', 'addressstores');
		Menus.addSubMenuItem('topbar', 'addressstores', 'New Addressstore', 'addressstores/create');
	}
]);