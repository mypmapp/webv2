'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Purchasercontactnote = mongoose.model('Purchasercontactnote'),
	_ = require('lodash');

/**
 * Create a Purchasercontactnote
 */
exports.create = function(req, res) {
	var purchasercontactnote = new Purchasercontactnote(req.body);
	purchasercontactnote.user = req.user;

	purchasercontactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchasercontactnote);
		}
	});
};

/**
 * Show the current Purchasercontactnote
 */
exports.read = function(req, res) {
	res.jsonp(req.purchasercontactnote);
};

/**
 * Update a Purchasercontactnote
 */
exports.update = function(req, res) {
	var purchasercontactnote = req.purchasercontactnote ;

	purchasercontactnote = _.extend(purchasercontactnote , req.body);

	purchasercontactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchasercontactnote);
		}
	});
};

/**
 * Delete an Purchasercontactnote
 */
exports.delete = function(req, res) {
	var purchasercontactnote = req.purchasercontactnote ;

	purchasercontactnote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchasercontactnote);
		}
	});
};

/**
 * List of Purchasercontactnotes
 */
exports.list = function(req, res) { 
	Purchasercontactnote.find().sort('-created').populate('user', 'displayName').exec(function(err, purchasercontactnotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchasercontactnotes);
		}
	});
};

/**
 * Purchasercontactnote middleware
 */
exports.purchasercontactnoteByID = function(req, res, next, id) { 
	Purchasercontactnote.findById(id).populate('user', 'displayName').exec(function(err, purchasercontactnote) {
		if (err) return next(err);
		if (! purchasercontactnote) return next(new Error('Failed to load Purchasercontactnote ' + id));
		req.purchasercontactnote = purchasercontactnote ;
		next();
	});
};

/**
 * Purchasercontactnote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.purchasercontactnote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
