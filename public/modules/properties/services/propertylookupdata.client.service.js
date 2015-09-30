'use strict';

angular.module('properties').factory('lookupTypes', function($http){

	function getDataPriceTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/priceTypes',
			cache: true
		}).success(callback);
	}
	function getDataChainTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/chainTypes',
			cache: true
		}).success(callback);
	}
	function getDataPropertyTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/propertyTypes',
			cache: true
		}).success(callback);
	}
	function getDataHeatingTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/heatingTypes',
			cache: true
		}).success(callback);
	}
	function getDataTenureTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/tenureTypes',
			cache: true
		}).success(callback);
	}
	function getDataCouncilTaxCostTermTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/councilTaxCostTermTypes',
			cache: true
		}).success(callback);
	}
	function getDataSolidWoodFlooringTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/solidWoodFlooringTypes',
			cache: true
		}).success(callback);
	}
	function getDataDoubleGlazingTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/doubleGlazingTypes',
			cache: true
		}).success(callback);
	}
	function getDataParkingTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/parkingTypes',
			cache: true
		}).success(callback);
	}
	function getDataHaveLandTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/haveLandTypes',
			cache: true
		}).success(callback);
	}
	function getDataHaveGardenTypes(callback){
		$http({
			method: 'GET',
			url: '/lookup/haveGardenTypes',
			cache: true
		}).success(callback);
	}
	return {
		priceTypeList: getDataPriceTypes,
		findPriceType: function(value, callback){
			getDataPriceTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		chainTypeList: getDataChainTypes,
		findChainType: function(value, callback){
			getDataChainTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		propertyTypeList: getDataPropertyTypes,
		findPropertyType: function(value, callback){
			getDataPropertyTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		heatingTypeList: getDataHeatingTypes,
		findHeatingType: function(value, callback){
			getDataHeatingTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		tenureTypeList: getDataTenureTypes,
		findTenureType: function(value, callback){
			getDataTenureTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		councilTaxCostTermList: getDataCouncilTaxCostTermTypes,
		findCouncilTaxCostTerm: function(value, callback){
			getDataCouncilTaxCostTermTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		solidWoodFlooringTypeList: getDataSolidWoodFlooringTypes,
		findSolidWoodFlooringType: function(value, callback){
			getDataSolidWoodFlooringTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		doubleGlazingTypeList: getDataDoubleGlazingTypes,
		findDoubleGlazingType: function(value, callback){
			getDataDoubleGlazingTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		parkingTypeList: getDataParkingTypes,
		findParkingType: function(value, callback){
			getDataParkingTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		haveLandTypeList: getDataHaveLandTypes,
		findHaveLandType: function(value, callback){
			getDataHaveLandTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
		haveGardenTypeList: getDataHaveGardenTypes,
		findHaveGardenType: function(value, callback){
			getDataHaveGardenTypes(function(data) {
				var vType = data.filter(function(entry){
					return entry.value === ''+value;
				})[0];
				callback(vType);
			});
		},
	};
});
