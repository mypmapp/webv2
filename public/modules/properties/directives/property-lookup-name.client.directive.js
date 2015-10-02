'use strict';

angular.module('properties').directive('propertyLookupName', ['$http', function(http) {
  return {
    template: "<span>{{name}}</span>",
    scope: {
      value: '=',
      templateOptions:'=to'
    },
    link: function(scope) {
      // console.log(scope.value);
      // console.log(scope.templateOptions.lookup);
      var urlLink='';
      switch (scope.templateOptions.lookup) {
        case 'chain':
          urlLink = '/lookup/chainTypes/' + scope.value;
          break;
        case 'property':
          urlLink = '/lookup/propertyTypes/' + scope.value;
          break;
        case 'tenure':
          urlLink = '/lookup/tenureTypes/' + scope.value;
          break;
        default:
          scope.name ='';
      }
      
      if(urlLink)
      {
          http.get(urlLink).success(function(data) {
          scope.name = data.name;
        }, function(err) {
          scope.name = '';
        });
      }
    }
  }
}]);