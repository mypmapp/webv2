'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Purchasercontactnote Schema
 */
var PurchasercontactnoteSchema = new Schema({
	notes: {
		type: String,
		default: '',
		required: 'Please fill Purchasercontactnote name',
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
	purchaser: {
		type: Schema.ObjectId,
		ref: 'Purchaser'
	},

});

mongoose.model('Purchasercontactnote', PurchasercontactnoteSchema);
