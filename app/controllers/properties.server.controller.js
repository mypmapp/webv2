'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Property = mongoose.model('Property'),
	_ = require('lodash');

/**
 * Create a Property
 */
exports.create = function(req, res) {
	var property = new Property(req.body);
	property.user = req.user;

	property.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(property);
		}
	});
};

/**
 * Show the current Property
 */
exports.read = function(req, res) {
	res.jsonp(req.property);
};

/**
 * Update a Property
 */
exports.update = function(req, res) {
	var property = req.property ;

	property = _.extend(property , req.body);

	property.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(property);
		}
	});
};

/**
 * Delete an Property
 */
exports.delete = function(req, res) {
	var property = req.property ;

	property.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(property);
		}
	});
};

/**
 * List of Properties
 */
exports.list = function(req, res) { 
	Property.find().sort('-created').populate('vendor').populate('user', 'displayName').exec(function(err, properties) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(properties);
		}
	});
};

/**
 * Property middleware
 */
exports.propertyByID = function(req, res, next, id) { 
	Property.findById(id).populate('vendor').populate('user', 'displayName').exec(function(err, property) {
		if (err) return next(err);
		if (! property) return next(new Error('Failed to load Property ' + id));
		req.property = property ;
		next();
	});
};



/**
 * List of properties for a vendor
 */

exports.propertyByVendorID = function(req, res) {
	Property.find({'vendor._id':req.params.vendorId}).sort('-created').populate('vendor').populate('user', 'displayName').exec(function(err, properties) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(properties);
		}
	});
};

/**
 * Property authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.property.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
