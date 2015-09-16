'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Addressstore = mongoose.model('Addressstore'),
	_ = require('lodash');

/**
 * Create a Addressstore
 */
exports.create = function(req, res) {
	var addressstore = new Addressstore(req.body);
	addressstore.user = req.user;

	addressstore.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addressstore);
		}
	});
};

/**
 * Show the current Addressstore
 */
exports.read = function(req, res) {
	res.jsonp(req.addressstore);
};

/**
 * Update a Addressstore
 */
exports.update = function(req, res) {
	var addressstore = req.addressstore ;

	addressstore = _.extend(addressstore , req.body);

	addressstore.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addressstore);
		}
	});
};

/**
 * Delete an Addressstore
 */
exports.delete = function(req, res) {
	var addressstore = req.addressstore ;

	addressstore.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addressstore);
		}
	});
};

/**
 * List of Addressstores
 */
exports.list = function(req, res) { 
	Addressstore.find().sort('-created').populate('user', 'displayName').exec(function(err, addressstores) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addressstores);
		}
	});
};

/**
 * Addressstore middleware
 */
exports.addressstoreByID = function(req, res, next, id) { 
	Addressstore.findById(id).populate('user', 'displayName').exec(function(err, addressstore) {
		if (err) return next(err);
		if (! addressstore) return next(new Error('Failed to load Addressstore ' + id));
		req.addressstore = addressstore ;
		next();
	});
};

/**
 * Addressstore authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.addressstore.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
