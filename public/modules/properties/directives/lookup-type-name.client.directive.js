'use strict';

angular.module('properties').directive('lookupTypeName', ['$http',
	function($http) {
		return {
			template: '<span>{{name}}</span>',
			restrict: 'E',
			scope:{
				valueId:'=',
				lType:'='
			},
			link: function postLink(scope) {
				$http.get('/lookup/propertyTypes/'+scope.valueId).success(function(data){
					console.log('Value: '+ scope.valueId);
					console.log('lType: '+ scope.lType);
					console.log(data);
					scope.name='test';
				});
			}
		};
	}
]);
