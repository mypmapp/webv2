'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller');

/**
 * Send User
 */

var priceTypeData = [

    {value:'16', name:'Unknown'},
    {value:'1', name:'None'},
    {value:'2', name:'Or Nearest Offer'},
    {value:'3', name:'Guide Price'},
    {value:'4', name:'Fixed Price'},
    {value:'5', name:'Offers in Excess of'},
    {value:'6', name:'Offers in Region of'},
    {value:'7', name:'Sale by Tender'},
    {value:'8', name:'POA'},
    {value:'9', name:'From'},
    {value:'10', name:'Leasehold'},
    {value:'11', name:'Shared ownership'},
    {value:'12', name:'Offers Over'},
    {value:'13', name:'Part buy, part rent'},
    {value:'14', name:'Shared Equity'},
    {value:'15', name:'Equity loan'}

];

var chainType=[
    {value:'1', name:'Unknown'},
    {value:'2', name:'No chain'},
    {value:'3', name:'Already purchased'},
    {value:'4', name:'Currently looking'},
    {value:'5', name:'Moving abroad'},
    {value:'6', name:'Moving to rented'},
    {value:'7', name:'Other'},
    {value:'8', name:'Tenanted'}
];


var propertyType=[
    {value:'2', name:'Bungalow'},
    {value:'1', name:'Detached House'},
    {value:'3', name:'Terraced House'},
    {value:'4', name:'Semi-detached House'},
    {value:'5', name:'Townhouse'},
    {value:'6', name:'Flat'},
    {value:'7', name:'End of terrace House'},
    {value:'8', name:'Link-Detached House'},
    {value:'9', name:'Penthouse'},
    {value:'10', name:'Maisonette'},
    {value:'11', name:'Apartment'},
    {value:'12', name:'Studio Flat'},
    {value:'13', name:'House Share'},
    {value:'14', name:'Land'},
    {value:'15', name:'End Town House'},
    {value:'16', name:'Link-Terraced House'},
    {value:'17', name:'End Property'},
    {value:'18', name:'Detached Barn Conversion'},
    {value:'19', name:'Barn Conversion'},
    {value:'20', name:'Cottage'},
    {value:'21', name:'House'},
    {value:'22', name:'Retirement Property'},
    {value:'23', name:'House/Flats'},
    {value:'24', name:'Equestrian Property'},
    {value:'25', name:'Houseboat'},
    {value:'26', name:'Coach House'},
    {value:'27', name:'Static Caravan'},
    {value:'28', name:'Farm House'},
    {value:'29', name:'Bungalow with Annexe'},
    {value:'30', name:'Garage'},
    {value:'31', name:'Mobile Home'},
    {value:'32', name:'Block of Apartments'}
];

var councilTaxCostTerm = [
    {value:'1', name:'Per Annum'},
    {value:'2', name:'Monthly'},
];

var tenureType = [
    {value:'1', name:'Unknown'},
    {value:'2', name:'Per Month'}
];

var heatingType = [
    {value:'1', name:'Gas'},
    {value:'2', name:'Oil'},
    {value:'3', name:'Electric'},
    {value:'4', name:'Solid Fuel'},
    {value:'5', name:'Other'}
];

var doubleGlazing = [
    {value:'1', name:'None'},
    {value:'2', name:'Part'},
    {value:'3', name:'All'}
];

var solidWoodFlooring = [
    {value:'1', name:'None'},
    {value:'2', name:'Part'},
    {value:'3', name:'All'}
];

var parkingType = [
    {value:'1', name:'None'},
    {value:'2', name:'Street Parking'},
    {value:'3', name:'Off Street Parking'},
    {value:'4', name:'Garage'},
    {value:'5', name:'Single Garage and Driveway'},
    {value:'6', name:'Double Garage'},
    {value:'7', name:'Double Garage and Driveway'},
    {value:'8', name:'Private Driveway'},
    {value:'9', name:'Permit Holder'},
    {value:'10', name:'Allocated Parking Spot'},
    {value:'11', name:'Underground Parking'},
    {value:'12', name:'Secure Gated Allocated Parking'}
];

var haveLandType = [
    {value:'1', name:'Yes'},
    {value:'2', name:'No'}
];

var haveGardenType=[
    {value:'1', name:'Yes'},
    {value:'2', name:'No'}
];


exports.priceTypes = function(req, res) {
    res.json(priceTypeData);
};

exports.chainTypes = function(req, res) {
    res.json(chainType);
};

exports.propertyTypes = function(req, res) {
    res.json(propertyType);
};

exports.heatingTypes = function(req, res) {
    res.json(heatingType);
};

exports.tenureTypes = function(req, res) {
    res.json(tenureType);
};

exports.councilTaxCostTermTypes = function(req, res) {
    res.json(councilTaxCostTerm);
};

exports.solidWoodFlooringTypes = function(req, res) {
    res.json(solidWoodFlooring);
};

exports.doubleGlazingTypes = function(req, res) {
    res.json(doubleGlazing);
};

exports.parkingTypes = function(req, res) {
    res.json(parkingType);
};

exports.haveLandTypes = function(req, res) {
    res.json(haveLandType);
};

exports.haveGardenTypes = function(req, res) {
    res.json(haveGardenType);
};
