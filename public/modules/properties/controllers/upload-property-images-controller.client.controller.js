'use strict';

angular.module('properties').controller('UploadPropertyImagesControllerController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Properties', 'FileUploader', 'Vendors',
	function ($scope, $stateParams, $location, $http, Authentication, Properties, FileUploader, Vendors) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

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

		// Find existing Property
		$scope.findOne = function () {
			$scope.property = Properties.get({
				propertyId: $stateParams.propertyId
			});
			$scope.enableSave = true;
			//console.log($scope.property);
		};
	}
]);
