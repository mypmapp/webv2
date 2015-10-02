'use strict';

angular.module('properties').directive('propertyLookupName', ['$http', function (http) {
    return {
        template: "<span>{{name}}</span>",
        link: function (scope,element, attributes) {
            console.log(attributes.lookUp);
            console.log(scope.property);

            var urlLink = '';
            scope.name = '';

            attributes.$observe('propertyLookupName', function(value){
                console.log(value);
            });

            attributes.$observe('lookUp', function(value){
                console.log(value);
            });

            switch (attributes.lookUp) {
                case 'chain':
                    scope.property.chainType ? urlLink = '/lookup/chainTypes/' + scope.property.chainType
                        : scope.name = '';
                    break;
                case 'property':
                    scope.property.propertyType ?
                        urlLink = '/lookup/propertyTypes/' + scope.property.propertyType
                        : scope.name = '';
                    break;
                case 'tenure':
                    scope.property.tenureType ? urlLink = '/lookup/tenureTypes/' + scope.property.tenureType
                        : scope.name = '';
                    break;
                default:
                    scope.name = '';
            }

            if (urlLink) {
                http.get(urlLink).success(function (data) {
                    scope.name = data.name;
                }, function (err) {
                    scope.name = '';
                });
            }
        }
    }
}]);
