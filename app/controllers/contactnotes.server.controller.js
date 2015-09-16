'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contactnote = mongoose.model('Contactnote'),
	_ = require('lodash');

/**
 * Create a Contactnote
 */
exports.create = function(req, res) {
	var contactnote = new Contactnote(req.body);
	contactnote.user = req.user;

	contactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactnote);
		}
	});
};

/**
 * Show the current Contactnote
 */
exports.read = function(req, res) {
	res.jsonp(req.contactnote);
};

/**
 * Update a Contactnote
 */
exports.update = function(req, res) {
	var contactnote = req.contactnote ;

	contactnote = _.extend(contactnote , req.body);

	contactnote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactnote);
		}
	});
};

/**
 * Delete an Contactnote
 */
exports.delete = function(req, res) {
	var contactnote = req.contactnote ;

	contactnote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactnote);
		}
	});
};

/**
 * List of Contactnotes
 */
exports.list = function(req, res) { 
	Contactnote.find().sort('-created').populate('user', 'displayName').exec(function(err, contactnotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contactnotes);
		}
	});
};

/**
 * Contactnote middleware
 */
exports.contactnoteByID = function(req, res, next, id) { 
	Contactnote.findById(id).populate('user', 'displayName').exec(function(err, contactnote) {
		if (err) return next(err);
		if (! contactnote) return next(new Error('Failed to load Contactnote ' + id));
		req.contactnote = contactnote ;
		next();
	});
};

/**
 * Contactnote authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contactnote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
