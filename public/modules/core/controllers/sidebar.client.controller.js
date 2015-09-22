'use strict';

angular.module('core').controller('SidebarController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        $scope.menu = {
            items:[
                {navUrl:'+',navText:'Vendor', navGroup:'vendor',navIon:'divider'},
                {navUrl:'/#!/vendors/create',navText:'Register Vendor', navGroup:'vendor',navIon:'glyphicon glyphicon-user'},
                {navUrl:'/#!/vendors',navText:'Find Vendor', navGroup:'vendor',navIon:'glyphicon glyphicon-search'},
                {navUrl:'/#!/vendors/email',navText:'Email Vendor', navGroup:'vendor',navIon:'glyphicon glyphicon-envelope'},
                {navUrl:'/#!/notes/vendors',navText:'Vendor Notes', navGroup:'comments',navIon:'glyphicon glyphicon-pencil'},

                {navUrl:'+',navText:'Property', navGroup:'property',navIon:'divider'},
                //{navUrl:'#!/properties/create',navText:'Register Property', navGroup:'property',navIon:'glyphicon glyphicon-home'},
                {navUrl:'#!//properties/pdf',navText:'Create Property PDF', navGroup:'property',navIon:'glyphicon glyphicon-file'},
                {navUrl:'#!//properties/view',navText:'Search Property', navGroup:'property',navIon:'glyphicon glyphicon-zoom-in'},
                {navUrl:'#!/purchaser/register/search',navText:'Purchaser Request(s)', navGroup:'property',navIon:'glyphicon glyphicon-copy'},

                {navUrl:'+',navText:'Purchaser', navGroup:'purchaser',navIon:'divider'},
                {navUrl:'/#!/purchasers/create',navText:'Register Purchaser', navGroup:'purchaser',navIon:'glyphicon glyphicon-plus'},
                {navUrl:'/#!/purchasers',navText:'Find Purchaser', navGroup:'purchaser',navIon:'glyphicon glyphicon-tag'},
                {navUrl:'/#!/purchasers/email',navText:'Email Purchaser', navGroup:'purchaser',navIon:'glyphicon glyphicon-bookmark'},
                {navUrl:'/#!/notes/purchasers',navText:'Purchaser Notes', navGroup:'comments',navIon:'glyphicon glyphicon-pencil'},

                //{navUrl:'+',navText:'Comments', navGroup:'comments',navIon:'divider'},
                //{navUrl:'/#!/vendorcontactnotes',navText:'Vendor Notes', navGroup:'comments',navIon:'glyphicon glyphicon-pencil'},
                //{navUrl:'/#!/purchasercontactnotes',navText:'Purchaser Notes', navGroup:'comments',navIon:'glyphicon glyphicon-edit'},
                //{navUrl:'/#!/property/feedback',navText:'Viewing Feedback', navGroup:'comments',navIon:'glyphicon glyphicon-check'},

                {navUrl:'+',navText:'Appointments', navGroup:'appointment',navIon:'divider'},
                {navUrl:'/#!/appointment/create',navText:'Create New Appointment', navGroup:'appointment',navIon:'glyphicon glyphicon-paperclip'},
                {navUrl:'/#!/appointment/view',navText:'View Appointment', navGroup:'appointment',navIon:'glyphicon glyphicon-calendar'},

                {navUrl:'+',navText:'Admin', navGroup:'admin',navIon:'divider'},
                {navUrl:'/auth/signout',navText:'Signout', navGroup:'admin',navIon:'glyphicon glyphicon-log-out'},
                {navUrl:'/#!/settings/profile',navText:'Edit Profile', navGroup:'admin',navIon:'glyphicon glyphicon-link'},
                {navUrl:'/#!/settings/password',navText:'Change Password', navGroup:'admin',navIon:'glyphicon glyphicon-align-center'},

            ]
        };


    }
]);
