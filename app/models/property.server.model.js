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
	name: {
		type: String,
		default: '',
		required: 'Please fill Property name',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
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
		required: 'Please fill asking price',
		trim: true
	},
	priceType: {
		type: String,
		default: '',
		required: 'Please fill price type',
		trim: true
	},
	chainType: {
		type: String,
		default: '',
		required: 'Please fill chain type',
		trim: true
	},
	propertyType: {
		type: String,
		default: '',
		required: 'Please fill property type',
		trim: true
	},
	tenureType: {
		type: String,
		default: '',
		required: 'Please fill tenure type',
		trim: true
	},
	propertyAgeYrs: {
		type: String,
		default: '',
		required: 'Please fill property age',
		trim: true
	},
	numberOfBeds: {
		type: String,
		default: '',
		required: 'Please fill not of beds',
		trim: true
	},
	numberOfReceptions: {
		type: String,
		default: '',
		required: 'Please fill not of reception',
		trim: true
	},
	numberOfBathrooms: {
		type: String,
		default: '',
		required: 'Please fill not of bathrooms',
		trim: true
	},
	councilTaxBand: {
		type: String,
		default: '',
		required: 'Please fill council tax band',
		trim: true
	},
	councilTaxCost: {
		type: String,
		default: '',
		required: 'Please fill council tax cost',
		trim: true
	},
	councilTaxCostTerm: {
		type: String,
		default: '',
		required: 'Please fill council tax term',
		trim: true
	},
	keyFeatures: {
		type: String,
		default: '',
		required: 'Please fill key features',
		trim: true
	},
	propertyDesc: {
		type: String,
		default: '',
		required: 'Please fill property description',
		trim: true
	},
	heatingType: {
		type: String,
		default: '',
		required: 'Please fill heathing type',
		trim: true
	},
	doubleGlazing: {
		type: String,
		default: '',
		required: 'Please fill double glazing type',
		trim: true
	},
	solidWoodFlooring: {
		type: String,
		default: '',
		required: 'Please fill solid wood flooring',
		trim: true
	},
	parkingType: {
		type: String,
		default: '',
		required: 'Please fill parking type',
		trim: true
	},
	haveLand: {
		type: String,
		default: '',
		required: 'Please fill land type',
		trim: true
	},
	haveGarden: {
		type: String,
		default: '',
		required: 'Please fill have garden',
		trim: true
	},
	propertyDirections: {
		type: String,
		default: '',
		required: 'Please fill property direction',
		trim: true
	},
	roomDetails:[{
		roomName: {
			type: String,
			default: '',
			required: 'Please fill room name',
			trim: true
		},
		roomType: {
			type: String,
			default: '',
			required: 'Please fill room type',
			trim: true
		},
		unitOfMeasure: {
			type: String,
			default: '',
			required: 'Please fill unit of measure',
			trim: true
		},
		roomWidthFt: {
			type: String,
			default: '',
			required: 'Please fill room width feet',
			trim: true
		},
		roomWidthIn: {
			type: String,
			default: '',
			required: 'Please fill room width inches',
			trim: true
		},
		roomLengthFt: {
			type: String,
			default: '',
			required: 'Please fill room length feet',
			trim: true
		},
		roomLengthIn: {
			type: String,
			default: '',
			required: 'Please fill room length inches',
			trim: true
		},
		roomDetails: {
			type: String,
			default: '',
			required: 'Please fill room details',
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
