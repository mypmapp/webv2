'use strict';

//Setting up route
angular.module('vendorcontactnotes').config(['$stateProvider',
    function ($stateProvider) {
        // Vendorcontactnotes state routing
        $stateProvider.
            state('listVendorcontactnotes', {
                url: '/notes/vendors',
                templateUrl: 'modules/vendorcontactnotes/views/list-vendorcontactnotes.client.view.html'
            }).
            state('createVendorcontactnote', {
                url: '/notes/vendors/:vendorId/create',
                templateUrl: 'modules/vendorcontactnotes/views/create-vendorcontactnote.client.view.html'
            }).
            state('vendorNotesView', {
                url: '/notes/vendors/:vendorId/view',
                templateUrl: 'modules/vendorcontactnotes/views/view-vendorcontactnote.client.view.html'
            });
    }
]);
