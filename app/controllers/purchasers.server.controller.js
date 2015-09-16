'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Purchaser = mongoose.model('Purchaser'),
	_ = require('lodash');

/**
 * Create a Purchaser
 */
exports.create = function(req, res) {
	var purchaser = new Purchaser(req.body);
	purchaser.user = req.user;

	purchaser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaser);
		}
	});
};

/**
 * Show the current Purchaser
 */
exports.read = function(req, res) {
	res.jsonp(req.purchaser);
};

/**
 * Update a Purchaser
 */
exports.update = function(req, res) {
	var purchaser = req.purchaser ;

	purchaser = _.extend(purchaser , req.body);

	purchaser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaser);
		}
	});
};

/**
 * Delete an Purchaser
 */
exports.delete = function(req, res) {
	var purchaser = req.purchaser ;

	purchaser.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchaser);
		}
	});
};

/**
 * List of Purchasers
 */
exports.list = function(req, res) { 
	Purchaser.find().sort('-created').populate('user', 'displayName').exec(function(err, purchasers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(purchasers);
		}
	});
};

/**
 * Purchaser middleware
 */
exports.purchaserByID = function(req, res, next, id) { 
	Purchaser.findById(id).populate('user', 'displayName').exec(function(err, purchaser) {
		if (err) return next(err);
		if (! purchaser) return next(new Error('Failed to load Purchaser ' + id));
		req.purchaser = purchaser ;
		next();
	});
};

/**
 * Purchaser authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.purchaser.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
