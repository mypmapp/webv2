'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var purchasers = require('../../app/controllers/purchasers.server.controller');

	// Purchasers Routes
	app.route('/purchasers')
		.get(purchasers.list)
		.post(users.requiresLogin, purchasers.create);

	app.route('/purchasers/:purchaserId')
		.get(purchasers.read)
		.put(users.requiresLogin, purchasers.hasAuthorization, purchasers.update)
		.delete(users.requiresLogin, purchasers.hasAuthorization, purchasers.delete);

	// Finish by binding the Purchaser middleware
	app.param('purchaserId', purchasers.purchaserByID);
};
