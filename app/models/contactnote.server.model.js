'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contactnote Schema
 */
var ContactnoteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Contactnote name',
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

mongoose.model('Contactnote', ContactnoteSchema);