'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var addressstores = require('../../app/controllers/addressstores.server.controller');

	// Addressstores Routes
	app.route('/addressstores')
		.get(addressstores.list)
		.post(users.requiresLogin, addressstores.create);

	app.route('/addressstores/:addressstoreId')
		.get(addressstores.read)
		.put(users.requiresLogin, addressstores.hasAuthorization, addressstores.update)
		.delete(users.requiresLogin, addressstores.hasAuthorization, addressstores.delete);

	// Finish by binding the Addressstore middleware
	app.param('addressstoreId', addressstores.addressstoreByID);
};
