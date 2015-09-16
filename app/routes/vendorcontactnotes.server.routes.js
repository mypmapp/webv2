'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var vendorcontactnotes = require('../../app/controllers/vendorcontactnotes.server.controller');

	// Vendorcontactnotes Routes
	app.route('/vendorcontactnotes')
		.get(vendorcontactnotes.list)
		.post(users.requiresLogin, vendorcontactnotes.create);

	app.route('/vendorcontactnotes/:vendorcontactnoteId')
		.get(vendorcontactnotes.read)
		.put(users.requiresLogin, vendorcontactnotes.hasAuthorization, vendorcontactnotes.update)
		.delete(users.requiresLogin, vendorcontactnotes.hasAuthorization, vendorcontactnotes.delete);

	// Finish by binding the Vendorcontactnote middleware
	app.param('vendorcontactnoteId', vendorcontactnotes.vendorcontactnoteByID);
};
