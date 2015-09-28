'use strict';

angular.module('properties').directive('uploadFile', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Upload file directive logic
				// ...

				element.text('this is the uploadFile directive');
			}
		};
	}
]);