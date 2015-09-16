'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Addressstore Schema
 */
var AddressstoreSchema = new Schema({
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
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Addressstore', AddressstoreSchema);
