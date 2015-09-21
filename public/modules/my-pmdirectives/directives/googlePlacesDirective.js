'use strict';
/**
 * Created by sri on 17/09/15.
 */
var googlePlacesDirective = function() {
    var componentForm = {
        premise: 'long_name',
        street_number: 'short_name',
        route: 'long_name',
        sublocality_level_1: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name',
        postal_town:'long_name',
        administrative_area_level_2:'long_name'
    };
    var mapping = {
        premise: 'BuildingName',
        street_number: 'Unit',
        route: 'Street',
        sublocality_level_1: 'Suburb',
        locality: 'City',
        administrative_area_level_1: 'State',
        country: 'Country',
        postal_code: 'PostCode',
        postal_town:'Town',
        administrative_area_level_2:'County'
        //Region, District, Level
    };

    return {
        require: 'ngModel',
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {
            ngModel: '=',
            address: '=?',
            callback: '&myFindFinishCallback'
        },
        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
        link: function(scope, element, attrs, model) {

            var options = {
                // componentRestrictions: { country: 'nz' },
                types: ['geocode']
            };

            var autocomplete = new google.maps.places.Autocomplete($('#google_places_ac')[0], options);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var location = place.geometry && place.geometry.location ? {
                    Latitude: place.geometry.location.lat(),
                    Longitude: place.geometry.location.lng()
                } : {};

                // Get each component of the address from the place location
                // and fill the corresponding field on the form.
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        location[mapping[addressType]] = val;
                    }
                }
                location.FormattedAddress = place.formatted_address;
                location.PlaceId = place.place_id;

                scope.$apply(function () {
                    scope.address = location; // array containing each location component
                    model.$setViewValue(location);
                    element.val(location[attrs.value]);
                    //console.log(scope.address);
                    //console.log(location);
                    scope.callback();
                });
            });
        }
    };
};
angular.module('my-pmdirectives').directive('googlePlaces',[googlePlacesDirective]);
