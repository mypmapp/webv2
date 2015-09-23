'use strict';

// Properties controller
angular.module('properties').controller('PropertiesController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Properties', 'FileUploader', 'Vendors',
    function ($scope, $stateParams, $location, $http, Authentication, Properties, FileUploader, Vendors) {
        $scope.authentication = Authentication;

        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');


        $scope.enableSaveDraft = false;

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
            //console.log("foo is greater than 4: ", $scope.addressLine1, oldVal, newVal);
            $scope.enableSaveDraft = false;

            if($scope.addressLine1 && $scope.addressLine2 && $scope.addressLine3 && $scope.addressLine4 && $scope.postcode && $scope.country)
                $scope.enableSaveDraft=true;

            //console.log($scope.enableSaveDraft);

        },true);

        // Find existing Vendor
        $scope.findVendor = function () {
            $scope.vendor = Vendors.get({
                vendorId: $stateParams.vendorId
            });
        };

        //File Upload Stuff
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        //console.info('uploader', uploader);

        //Finish Upload Stuff

        $scope.CallBackFinishSearch = function (mode) {
            if ($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
            if ($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
            if ($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
            if ($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
            if ($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
            if ($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
        };

        $scope.SaveDraft = function () {
            // Create new Property object
            var property = new Properties({
                propertyStatus:2,
                //Address
                addressLine1:$scope.addressLine1,
                addressLine2:$scope.addressLine2,
                addressLine3:$scope.addressLine3,
                addressLine4:$scope.addressLine4,
                postcode:$scope.postcode,
                country:$scope.country,
                vendor:$scope.vendor._id
            });

            // Redirect after save
            property.$save(function (response) {
                $location.path('properties/' + response._id);

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Create new Property
        $scope.create = function () {
            // Create new Property object
            var property = new Properties({
                //Address
                addressLine1:$scope.addressLine1,
                addressLine2:$scope.addressLine2,
                addressLine3:$scope.addressLine3,
                addressLine4:$scope.addressLine4,
                postcode:$scope.postcode,
                country:$scope.country,
                //
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
        $scope.remove = function (property) {
            if (property) {
                property.$remove();

                for (var i in $scope.properties) {
                    if ($scope.properties [i] === property) {
                        $scope.properties.splice(i, 1);
                    }
                }
            } else {
                $scope.property.$remove(function () {
                    $location.path('properties');
                });
            }
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
            console.log($scope.properties);
        };

        // Find existing Property
        $scope.findOne = function () {
            $scope.property = Properties.get({
                propertyId: $stateParams.propertyId
            });
            console.log($scope.property);
        };
    }
]);
