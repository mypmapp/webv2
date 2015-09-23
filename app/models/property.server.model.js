'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Property Schema
 */
var PropertySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	propertyStatus:
	{
		type: Number,
		default: '7'
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
	},
	country: {
		type: String,
		default: 'United Kingdom',
		trim: true
	},
	priceAsking: {
		type: String,
		default: '',
		trim: true
	},
	priceType: {
		type: String,
		default: '',
		trim: true
	},
	chainType: {
		type: String,
		default: '',
		trim: true
	},
	propertyType: {
		type: String,
		default: '',
		trim: true
	},
	tenureType: {
		type: String,
		default: '',
		trim: true
	},
	propertyAgeYrs: {
		type: String,
		default: '',
		trim: true
	},
	numberOfBeds: {
		type: String,
		default: '',
		trim: true
	},
	numberOfReceptions: {
		type: String,
		default: '',
		trim: true
	},
	numberOfBathrooms: {
		type: String,
		default: '',
		trim: true
	},
	councilTaxBand: {
		type: String,
		default: '',
		trim: true
	},
	councilTaxCost: {
		type: String,
		default: '',
		trim: true
	},
	councilTaxCostTerm: {
		type: String,
		default: '',
		trim: true
	},
	keyFeatures: {
		type: String,
		default: '',
		trim: true
	},
	propertyDesc: {
		type: String,
		default: '',
		trim: true
	},
	heatingType: {
		type: String,
		default: '',
		trim: true
	},
	doubleGlazing: {
		type: String,
		default: '',
		trim: true
	},
	solidWoodFlooring: {
		type: String,
		default: '',
		trim: true
	},
	parkingType: {
		type: String,
		default: '',
		trim: true
	},
	haveLand: {
		type: String,
		default: '',
		trim: true
	},
	haveGarden: {
		type: String,
		default: '',
		trim: true
	},
	propertyDirections: {
		type: String,
		default: '',
		trim: true
	},
	roomDetails:[{
		roomName: {
			type: String,
			default: '',
			trim: true
		},
		roomType: {
			type: String,
			default: '',
			trim: true
		},
		unitOfMeasure: {
			type: String,
			default: '',
			trim: true
		},
		roomWidthFt: {
			type: String,
			default: '',
			trim: true
		},
		roomWidthIn: {
			type: String,
			default: '',
			trim: true
		},
		roomLengthFt: {
			type: String,
			default: '',
			trim: true
		},
		roomLengthIn: {
			type: String,
			default: '',
			trim: true
		},
		roomDetails: {
			type: String,
			default: '',
			trim: true
		}
	}],
	vendor: {
		type: Schema.ObjectId,
		ref: 'Vendor'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Property', PropertySchema);
