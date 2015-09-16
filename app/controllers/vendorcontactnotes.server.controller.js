'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Vendorcontactnote = mongoose.model('Vendorcontactnote'),
	_ = require('lodash');

/**
 * Create a Vendorcontactnote
 */
exports.create = function(req, res) {
	var vendorcontactnote = new Vendorcontactnote(req.body);
	vendorcontactnote.user = req.user;

	vendorcontactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendorcontactnote);
		}
	});
};

/**
 * Show the current Vendorcontactnote
 */
exports.read = function(req, res) {
	res.jsonp(req.vendorcontactnote);
};

/**
 * Update a Vendorcontactnote
 */
exports.update = function(req, res) {
	var vendorcontactnote = req.vendorcontactnote ;

	vendorcontactnote = _.extend(vendorcontactnote , req.body);

	vendorcontactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendorcontactnote);
		}
	});
};

/**
 * Delete an Vendorcontactnote
 */
exports.delete = function(req, res) {
	var vendorcontactnote = req.vendorcontactnote ;

	vendorcontactnote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendorcontactnote);
		}
	});
};

/**
 * List of Vendorcontactnotes
 */
exports.list = function(req, res) { 
	Vendorcontactnote.find().sort('-created').populate('user', 'displayName').exec(function(err, vendorcontactnotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vendorcontactnotes);
		}
	});
};

/**
 * Vendorcontactnote middleware
 */
exports.vendorcontactnoteByID = function(req, res, next, id) { 
	Vendorcontactnote.findById(id).populate('Vendor').populate('user', 'displayName').exec(function(err, vendorcontactnote) {
		if (err) return next(err);
		if (! vendorcontactnote) return next(new Error('Failed to load Vendorcontactnote ' + id));
		req.vendorcontactnote = vendorcontactnote ;
		next();
	});
};

/**
 * Vendorcontactnote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.vendorcontactnote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
