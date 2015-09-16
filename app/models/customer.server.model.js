'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	title: {
		type: String,
		default: 'Mr.',
		required: 'Please fill title',
		trim: true
	},
	firstName: {
		type: String,
		default: '',
		required: 'Please fill first name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill last name',
		trim: true
	},
	emailPrimary: {
		type: String,
		default: '',
		required: 'Please fill primary email',
		trim: true
	},
	emailSecondary: {
		type: String,
		default: '',
		trim: true
	},
	phonePrimary: {
		type: String,
		default: '',
		required: 'Please fill primary phone',
		trim: true
	},
	phoneSecondary: {
		type: String,
		default: '',
		trim: true
	},
	addressLine1: {
		type: String,
		default: '',
		required: 'Please fill address line1',
		trim: true
	},
	addressLine2: {
		type: String,
		default: '',
		trim: true
	},
	addressLine3: {
		type: String,
		default: '',
		required: 'Please fill address line3',
		trim: true
	},
	addressLine4: {
		type: String,
		default: '',
		trim: true
	},
	postcode: {
		type: String,
		default: '',
		required: 'Please fill postcode',
		trim: true
	}

});

module.exports = {
	CustomerBase: CustomerSchema
};
