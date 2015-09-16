'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vendorcontactnote Schema
 */
var VendorcontactnoteSchema = new Schema({
	notes: {
		type: String,
		default: '',
		required: 'Please fill Vendorcontactnote name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	vendor: {
		type: Schema.ObjectId,
		ref: 'Vendor'
	}
});

mongoose.model('Vendorcontactnote', VendorcontactnoteSchema);
