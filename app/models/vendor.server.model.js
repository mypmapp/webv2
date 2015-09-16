'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	CustomerBase =  require('./customer.server.model').CustomerBase,
	Schema = mongoose.Schema;
/**
 * Vendor Schema
 */

var VendorSchema = CustomerBase.extend(
	{
		created: {
			type: Date,
			default: Date.now
		},
		user: {
			type: Schema.ObjectId,
			ref: 'User'
		}
	}
);

mongoose.model('Vendor', VendorSchema);
