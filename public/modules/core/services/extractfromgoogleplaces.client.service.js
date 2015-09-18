'use strict';

angular.module('core').factory('Extractfromgoogleplaces', [
	function() {
		// Public API
		return {
			extractFromAdress: function(components, type) {
				for (var i=0; i<components.length; i++)
					for (var j=0; j<components[i].types.length; j++)
						if (components[i].types[j]==type) return components[i].long_name;
				return "";
			}
		};
	}
]);
