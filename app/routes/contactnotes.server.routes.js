'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var contactnotes = require('../../app/controllers/contactnotes.server.controller');

	// Contactnotes Routes
	app.route('/contactnotes')
		.get(contactnotes.list)
		.post(users.requiresLogin, contactnotes.create);

	app.route('/contactnotes/:contactnoteId')
		.get(contactnotes.read)
		.put(users.requiresLogin, contactnotes.hasAuthorization, contactnotes.update)
		.delete(users.requiresLogin, contactnotes.hasAuthorization, contactnotes.delete);

	// Finish by binding the Contactnote middleware
	app.param('contactnoteId', contactnotes.contactnoteByID);
};
