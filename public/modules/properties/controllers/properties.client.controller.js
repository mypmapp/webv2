'use strict';

// Properties controller
angular.module('properties').controller('PropertiesController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Properties', 'Vendors','lookupTypes',
    function ($scope, $stateParams, $location, $http, Authentication, Properties, Vendors,lookupTypes) {
        $scope.authentication = Authentication;

        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        $scope.roomsData = [];
        $scope.enableSave = false;

        $scope.initOnCreate = function()
        {
            console.log('Called initOnCreate');

            lookupTypes.priceTypeList(function(priceTypes) {
                $scope.priceTypes = priceTypes;
            });

            lookupTypes.chainTypeList(function(chainTypes) {
                $scope.chainTypes = chainTypes;
            });

            lookupTypes.propertyTypeList(function(propertyTypes) {
                $scope.propertyTypes = propertyTypes;
            });

            lookupTypes.tenureTypeList(function(tenureTypes) {
                $scope.tenureTypes = tenureTypes;
            });

            lookupTypes.councilTaxCostTermList(function(councilTaxTypes) {
                $scope.councilTaxTypes = councilTaxTypes;
            });

            lookupTypes.heatingTypeList(function(heatingTypes) {
                $scope.heatingTypes = heatingTypes;
            });

            lookupTypes.solidWoodFlooringTypeList(function(solidWoodFlooringTypes) {
                $scope.solidWoodFlooringTypes = solidWoodFlooringTypes;
            });

            lookupTypes.doubleGlazingTypeList(function(doubleGlazingTypes) {
                $scope.doubleGlazingTypes = doubleGlazingTypes;
            });

            lookupTypes.parkingTypeList(function(parkingTypes) {
                $scope.parkingTypes = parkingTypes;
            });

            lookupTypes.haveLandTypeList(function(haveLandTypes) {
                $scope.haveLandTypes = haveLandTypes;
            });

            lookupTypes.haveGardenTypeList(function(haveGardenTypes) {
                $scope.haveGardenTypes = haveGardenTypes;
            });

        };


        $scope.addNewRoom = function()
        {
            console.log($scope.roomsData);
            $scope.roomsData.push(
                {
                    roomName:'',
                    roomType:'',
                    unitOfMeasure:'',
                    roomWidthFt:0,
                    roomWidthIn:0,
                    roomLengthFt:0,
                    roomLengthIn:0,
                    roomDetails:''
                }
            );

        };
        $scope.saveNewRoom = function(item)
        {
            $scope.lastRoomSaved = angular.copy(item);
        };

        $scope.ChkRegAddressChanged = function()
        {
            var chkStatus = parseInt($scope.chkRegAddress);

            if(chkStatus)
                _updateAddressSameAsRegisterd();
            if(!chkStatus)
                _resetAddress();
        };

        function _resetAddress() {
            $scope.addressLine1 = '';
            $scope.addressLine2 = '';
            $scope.addressLine3 = '';
            $scope.addressLine4 = '';
            $scope.postcode = '';
            $scope.country = '';

        }

        function _updateAddressSameAsRegisterd() {
            $scope.addressLine1 = $scope.vendor.addressLine1;
            $scope.addressLine2 = $scope.vendor.addressLine2;
            $scope.addressLine3 = $scope.vendor.addressLine3;
            $scope.addressLine4 = $scope.vendor.addressLine4;
            $scope.postcode = $scope.vendor.postcode;
            $scope.country = $scope.vendor.country;
        }

        $scope.$watchCollection('[addressLine1,addressLine2,addressLine3,addressLine4,postcode,country]',function(newVal, oldVal)
        {
            $scope.enableSave = false;

            if($scope.addressLine1 && $scope.addressLine2 && $scope.addressLine3 && $scope.addressLine4 && $scope.postcode && $scope.country)
                $scope.enableSave=true;

            //console.log("address values: ", $scope.addressLine1, oldVal, newVal,$scope.enableSave);

        },true);

        // Find existing Vendor
        $scope.findVendor = function () {
            $scope.vendor = Vendors.get({
                vendorId: $stateParams.vendorId
            });
        };

        //Finish Upload Stuff

        $scope.CallBackFinishSearch = function (mode) {
            if ($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
            if ($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
            if ($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
            if ($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
            if ($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
            if ($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
        };

        // Create new Property
        $scope.create = function () {

            console.log($scope.priceAsking);
            // Create new Property object
            var property = new Properties({
                //Address
                addressLine1:$scope.addressLine1,
                addressLine2:$scope.addressLine2,
                addressLine3:$scope.addressLine3,
                addressLine4:$scope.addressLine4,
                postcode:$scope.postcode,
                country:$scope.country,

                priceAsking:$scope.priceAsking,
                priceType:$scope.priceType,
                chainType:$scope.chainType,

                propertyType:$scope.propertyType,
                tenureType:$scope.tenureType,
                propertyAgeYrs:$scope.propertyAgeYrs,

                numberOfBeds:$scope.numberOfBeds,
                numberOfBathrooms:$scope.numberOfBathrooms,
                numberOfReceptions:$scope.numberOfReceptions,

                councilTaxBand:$scope.councilTaxBand,
                councilTaxCost:$scope.councilTaxCost,
                councilTaxCostTerm:$scope.councilTaxCostTerm,

                keyFeatures:$scope.keyFeatures,
                propertyDesc:$scope.propertyDesc,
                heatingType:$scope.heatingType,

                doubleGlazing:$scope.doubleGlazing,
                solidWoodFlooring:$scope.solidWoodFlooring,
                parkingType:$scope.parkingType,

                haveLand:$scope.haveLand,
                haveGarden:$scope.haveGarden,
                propertyDirections:$scope.propertyDirections,

                vendor:$scope.vendor._id,
            });

            // Redirect after save
            property.$save(function (response) {
                $location.path('properties/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Property
        $scope.remove = function () {

            var property = $scope.property;

            property.propertyState=3;

            property.$update(function () {
                $location.path('properties/' + property._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            //Old Code
            //if (property) {
            //    property.$remove();
            //
            //    for (var i in $scope.properties) {
            //        if ($scope.properties [i] === property) {
            //            $scope.properties.splice(i, 1);
            //        }
            //    }
            //} else {
            //    $scope.property.$remove(function () {
            //        $location.path('properties');
            //    });
            //}

        };

        // Update existing Property
        $scope.update = function () {
            var property = $scope.property;

            property.$update(function () {
                $location.path('properties/' + property._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Properties
        $scope.find = function () {
            $scope.properties = Properties.query();
            //console.log($scope.properties);
        };

        // Find existing Property
        $scope.findOne = function () {
            $scope.property = Properties.get({
                propertyId: $stateParams.propertyId
            });

            $scope.enableSave = true;
        };
    }
]);
