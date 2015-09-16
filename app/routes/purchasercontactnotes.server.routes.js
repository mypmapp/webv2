'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var purchasercontactnotes = require('../../app/controllers/purchasercontactnotes.server.controller');

	// Purchasercontactnotes Routes
	app.route('/purchasercontactnotes')
		.get(purchasercontactnotes.list)
		.post(users.requiresLogin, purchasercontactnotes.create);

	app.route('/purchasercontactnotes/:purchasercontactnoteId')
		.get(purchasercontactnotes.read)
		.put(users.requiresLogin, purchasercontactnotes.hasAuthorization, purchasercontactnotes.update)
		.delete(users.requiresLogin, purchasercontactnotes.hasAuthorization, purchasercontactnotes.delete);

	// Finish by binding the Purchasercontactnote middleware
	app.param('purchasercontactnoteId', purchasercontactnotes.purchasercontactnoteByID);
};
