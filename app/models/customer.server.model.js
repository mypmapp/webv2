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
		required: 'Please fill Vendor title',
		trim: true
	},
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Vendor first name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill Vendor last name',
		trim: true
	},
	emailPrimary: {
		type: String,
		default: '',
		required: 'Please fill Vendor primary email',
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
		//required: 'Please fill Vendor primary phone',
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
		//required: 'Please fill Vendor address line1',
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
		required: 'Please fill Vendor address line3',
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
		required: 'Please fill Vendor postcode',
		trim: true
	}
});

module.exports = {
	CustomerBase: CustomerSchema
};
