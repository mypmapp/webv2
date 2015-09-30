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
	propertyState:
	{
		type: Number,
        default: 2
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
		type: Number
	},
	priceType: {
		type: Number
	},
	chainType: {
		type: Number
	},
	propertyType: {
		type: Number
	},
	tenureType: {
		type: Number
	},
	propertyAgeYrs: {
		type: Number
	},
	numberOfBeds: {
		type: Number
	},
	numberOfReceptions: {
		type: Number
	},
	numberOfBathrooms: {
		type: Number
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
		type: Number
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
		type: Number
	},
	doubleGlazing: {
		type: Number
	},
	solidWoodFlooring: {
		type: Number
	},
	parkingType: {
		type: Number
	},
	haveLand: {
		type: Number
	},
	haveGarden: {
		type: Number
	},
	propertyDirections: {
		type: String,
		default: '',
		trim: true
	},
	propertyImages:[
		{
			imageName:{
				type: String,
				default: '',
				trim: true
			},
			imagePath:{
				type: String,
				default: '',
				trim: true
			},
			imageDesc:{
				type: String,
				default: '',
				trim: true
			}
		}
	],
	vendorIdentification:[
		{
			documentName:{
				type: String,
				default: '',
				trim: true
			},
			documentPath:{
				type: String,
				default: '',
				trim: true
			},
			documentDesc:{
				type: String,
				default: '',
				trim: true
			}
		}
	],
	floorPlans:[
		{
			imageName:{
				type: String,
				default: '',
				trim: true
			},
			imagePath:{
				type: String,
				default: '',
				trim: true
			},
			imageDesc:{
				type: String,
				default: '',
				trim: true
			}
		}
	],
	epcDocument:[
		{
			documentName:{
				type: String,
				default: '',
				trim: true
			},
			documentPath:{
				type: String,
				default: '',
				trim: true
			},
			documentDesc: {
				type: String,
				default: '',
				trim: true
			}
		}
	],
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
			type: Number
		},
		roomWidthIn: {
			type: Number
		},
		roomLengthFt: {
			type: Number
		},
		roomLengthIn: {
			type: Number
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
