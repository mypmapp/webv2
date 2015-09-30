'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var vendorproperties = require('../../app/controllers/vendorproperties.server.controller');

    // Routing logic
    app.route('/vendors/properties/:vendorId');

};
