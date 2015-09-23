'use strict';

angular.module('properties').filter('propertyStatus', [
	function() {
		return function(input) {
			var cssClass='';
			var cssText='';
			switch(input)
			{
				case 2:
					cssClass='label-warning';
					cssText='Draft State';
					break;
				case 0:
					cssClass='label-important';
					cssText='Property Deleted';
					break;
				case 4:
					cssClass='label-success';
					cssText='Property Published';
					break;
				default :
					cssClass='label-inverse';
					cssText='Unknown State';

			}
			return cssText;
		};
	}
]);
