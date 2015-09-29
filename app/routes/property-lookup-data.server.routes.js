'use strict';

module.exports = function(app) {

    // User Routes
    var lookupData = require('../controllers/property-lookup-data.server.controller.js');

    app.route('/lookup/priceTypes').get(lookupData.priceTypes);
    app.route('/lookup/chainTypes').get(lookupData.chainTypes);
    app.route('/lookup/propertyTypes').get(lookupData.propertyTypes);
    app.route('/lookup/heatingTypes').get(lookupData.heatingTypes);
    app.route('/lookup/tenureTypes').get(lookupData.tenureTypes);
    app.route('/lookup/councilTaxCostTermTypes').get(lookupData.councilTaxCostTermTypes);
    app.route('/lookup/solidWoodFlooringTypes').get(lookupData.solidWoodFlooringTypes);
    app.route('/lookup/doubleGlazingTypes').get(lookupData.doubleGlazingTypes);
    app.route('/lookup/parkingTypes').get(lookupData.parkingTypes);
    app.route('/lookup/haveLandTypes').get(lookupData.haveLandTypes);
    app.route('/lookup/haveGardenTypes').get(lookupData.haveGardenTypes);

};
