'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mypm';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','rcWizard', 'rcForm', 'rcDisabledBootstrap','ui.gravatar','textAngular'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('addressstores');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('contactnotes');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('my-pmdirectives');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('properties');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('purchasercontactnotes');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('purchasers');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('vendorcontactnotes');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('vendors');
'use strict';

// Configuring the Articles module
angular.module('addressstores').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Addressstores', 'addressstores', 'dropdown', '/addressstores(/create)?');
		Menus.addSubMenuItem('topbar', 'addressstores', 'List Addressstores', 'addressstores');
		Menus.addSubMenuItem('topbar', 'addressstores', 'New Addressstore', 'addressstores/create');
	}
]);
'use strict';

//Setting up route
angular.module('addressstores').config(['$stateProvider',
	function($stateProvider) {
		// Addressstores state routing
		$stateProvider.
		state('listAddressstores', {
			url: '/addressstores',
			templateUrl: 'modules/addressstores/views/list-addressstores.client.view.html'
		}).
		state('createAddressstore', {
			url: '/addressstores/create',
			templateUrl: 'modules/addressstores/views/create-addressstore.client.view.html'
		}).
		state('viewAddressstore', {
			url: '/addressstores/:addressstoreId',
			templateUrl: 'modules/addressstores/views/view-addressstore.client.view.html'
		}).
		state('editAddressstore', {
			url: '/addressstores/:addressstoreId/edit',
			templateUrl: 'modules/addressstores/views/edit-addressstore.client.view.html'
		});
	}
]);
'use strict';

// Addressstores controller
angular.module('addressstores').controller('AddressstoresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Addressstores',
	function($scope, $stateParams, $location, Authentication, Addressstores) {
		$scope.authentication = Authentication;

		// Create new Addressstore
		$scope.create = function() {
			// Create new Addressstore object
			var addressstore = new Addressstores ({
				name: this.name
			});

			// Redirect after save
			addressstore.$save(function(response) {
				$location.path('addressstores/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Addressstore
		$scope.remove = function(addressstore) {
			if ( addressstore ) { 
				addressstore.$remove();

				for (var i in $scope.addressstores) {
					if ($scope.addressstores [i] === addressstore) {
						$scope.addressstores.splice(i, 1);
					}
				}
			} else {
				$scope.addressstore.$remove(function() {
					$location.path('addressstores');
				});
			}
		};

		// Update existing Addressstore
		$scope.update = function() {
			var addressstore = $scope.addressstore;

			addressstore.$update(function() {
				$location.path('addressstores/' + addressstore._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Addressstores
		$scope.find = function() {
			$scope.addressstores = Addressstores.query();
		};

		// Find existing Addressstore
		$scope.findOne = function() {
			$scope.addressstore = Addressstores.get({ 
				addressstoreId: $stateParams.addressstoreId
			});
		};
	}
]);
'use strict';

//Addressstores service used to communicate Addressstores REST endpoints
angular.module('addressstores').factory('Addressstores', ['$resource',
	function($resource) {
		return $resource('addressstores/:addressstoreId', { addressstoreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('contactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contactnotes', 'contactnotes', 'dropdown', '/contactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'contactnotes', 'List Contactnotes', 'contactnotes');
		Menus.addSubMenuItem('topbar', 'contactnotes', 'New Contactnote', 'contactnotes/create');
	}
]);
'use strict';

//Setting up route
angular.module('contactnotes').config(['$stateProvider',
	function($stateProvider) {
		// Contactnotes state routing
		$stateProvider.
		state('listContactnotes', {
			url: '/contactnotes',
			templateUrl: 'modules/contactnotes/views/list-contactnotes.client.view.html'
		}).
		state('createContactnote', {
			url: '/contactnotes/create',
			templateUrl: 'modules/contactnotes/views/create-contactnote.client.view.html'
		}).
		state('viewContactnote', {
			url: '/contactnotes/:contactnoteId',
			templateUrl: 'modules/contactnotes/views/view-contactnote.client.view.html'
		}).
		state('editContactnote', {
			url: '/contactnotes/:contactnoteId/edit',
			templateUrl: 'modules/contactnotes/views/edit-contactnote.client.view.html'
		});
	}
]);
'use strict';

// Contactnotes controller
angular.module('contactnotes').controller('ContactnotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contactnotes',
	function($scope, $stateParams, $location, Authentication, Contactnotes) {
		$scope.authentication = Authentication;

		// Create new Contactnote
		$scope.create = function() {
			// Create new Contactnote object
			var contactnote = new Contactnotes ({
				name: this.name
			});

			// Redirect after save
			contactnote.$save(function(response) {
				$location.path('contactnotes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contactnote
		$scope.remove = function(contactnote) {
			if ( contactnote ) { 
				contactnote.$remove();

				for (var i in $scope.contactnotes) {
					if ($scope.contactnotes [i] === contactnote) {
						$scope.contactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.contactnote.$remove(function() {
					$location.path('contactnotes');
				});
			}
		};

		// Update existing Contactnote
		$scope.update = function() {
			var contactnote = $scope.contactnote;

			contactnote.$update(function() {
				$location.path('contactnotes/' + contactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contactnotes
		$scope.find = function() {
			$scope.contactnotes = Contactnotes.query();
		};

		// Find existing Contactnote
		$scope.findOne = function() {
			$scope.contactnote = Contactnotes.get({ 
				contactnoteId: $stateParams.contactnoteId
			});
		};
	}
]);
'use strict';

//Contactnotes service used to communicate Contactnotes REST endpoints
angular.module('contactnotes').factory('Contactnotes', ['$resource',
	function($resource) {
		return $resource('contactnotes/:contactnoteId', { contactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('dashboard', {
			url: '/dash',
			templateUrl: 'modules/core/views/dashboard.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

'use strict';

angular.module('core').controller('DashboardController',['$scope','$location', 'Authentication',
	function($scope,$location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

	}
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
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
                {navUrl:'#!/properties/create',navText:'Register Property', navGroup:'property',navIon:'glyphicon glyphicon-home'},
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

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

angular.module('my-pmdirectives').directive('customerBriefDetails', [
	function() {
		return {
			templateUrl: '../modules/my-pmdirectives/views/customer-brief-details.client.view.html',
			restrict: 'E',
			scope: {
				customer: '=',
				templateOptions:'=to'
			},

			controller: ["$scope", function ($scope) {
				//console.log($scope.templateOptions.customerType);
			}]
		};
	}
]);

'use strict';

angular.module('my-pmdirectives').directive('editRegistration', ['Vendors','Purchasers','$location',
	function(Vendors,Purchasers,$location) {
		return {
			templateUrl: '../modules/my-pmdirectives/views/edit-registration.client.view.html',
			restrict: 'E',
			scope: {
				customer: '=',
				templateOptions:'=to'
			},

			controller: ["$scope", function ($scope) {
				$scope.update = function()
				{
					if($scope.templateOptions.customerType==='vendor')
					{
						$scope.updateVendor();
					}

					if($scope.templateOptions.customerType==='purchaser')
					{
						$scope.updatePurchaser();
					}
				};

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.customer.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.customer.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.customer.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.customer.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.customer.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.customer.country = $scope.address.FormattedAddress.Country;
				};


				// Update existing Vendor
				$scope.updateVendor = function() {

					var vendor = new Vendors (
						{
							_id: $scope.customer._id,
							title: $scope.customer.title,
							firstName: $scope.customer.firstName,
							lastName: $scope.customer.lastName,
							phonePrimary: $scope.customer.phonePrimary,
							phoneSecondary: $scope.customer.phoneSecondary,
							emailPrimary: $scope.customer.emailPrimary,
							emailSecondary: $scope.customer.emailSecondary,
							addressLine1: $scope.customer.addressLine1,
							addressLine2: $scope.customer.addressLine2,
							addressLine3: $scope.customer.addressLine3,
							addressLine4: $scope.customer.addressLine4,
							postcode: $scope.customer.postcode,
							country: $scope.customer.country
						}
					);

					vendor.$update(function() {
						$location.path('vendors/' + vendor._id);
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

				// Update existing Purchaser
				$scope.updatePurchaser = function() {
					var purchaser = new Purchasers (
						{
							_id: $scope.customer._id,
							title: $scope.customer.title,
							firstName: $scope.customer.firstName,
							lastName: $scope.customer.lastName,
							phonePrimary: $scope.customer.phonePrimary,
							phoneSecondary: $scope.customer.phoneSecondary,
							emailPrimary: $scope.customer.emailPrimary,
							emailSecondary: $scope.customer.emailSecondary,
							addressLine1: $scope.customer.addressLine1,
							addressLine2: $scope.customer.addressLine2,
							addressLine3: $scope.customer.addressLine3,
							addressLine4: $scope.customer.addressLine4,
							postcode: $scope.customer.postcode,
							country: $scope.customer.country
						}
					);

					purchaser.$update(function() {
						$location.path('purchasers/' + purchaser._id);
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

			}]
		};
	}
]);

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

'use strict';

angular.module('my-pmdirectives').directive('newProperty', [
	function() {
		return {
			templateUrl: '../modules/my-pmdirectives/views/new-property.client.view.html',
			restrict: 'E',
			controller: ["$scope", function ($scope) {

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
				};

			}]
		};
	}
]);

'use strict';

angular.module('my-pmdirectives').directive('newRegistration', ['Vendors','Purchasers','$location',
	function(Vendors,Purchasers,$location) {
		return {
			templateUrl: '../modules/my-pmdirectives/views/new-registration.client.view.html',
			restrict: 'E',
			scope: {
				templateOptions:'=to'
			},

			controller: ["$scope", function ($scope) {

				$scope.CallBackFinishSearch = function(mode) {
					if($scope.address.FormattedAddress.Unit) $scope.addressLine1 = $scope.address.FormattedAddress.Unit;
					if($scope.address.FormattedAddress.Street) $scope.addressLine2 = $scope.address.FormattedAddress.Street;
					if($scope.address.FormattedAddress.Town) $scope.addressLine3 = $scope.address.FormattedAddress.Town;
					if($scope.address.FormattedAddress.County) $scope.addressLine4 = $scope.address.FormattedAddress.County;
					if($scope.address.FormattedAddress.PostCode) $scope.postcode = $scope.address.FormattedAddress.PostCode;
					if($scope.address.FormattedAddress.Country) $scope.country = $scope.address.FormattedAddress.Country;
				};

				$scope.create = function()
				{
					console.log('Create Called Do Something');
					if($scope.templateOptions.customerType==='vendor')
					{
						$scope.createVendor();
					}

					if($scope.templateOptions.customerType==='purchaser')
					{
						$scope.createPurchaser();
					}

				};

				// Create new Vendor
				$scope.createVendor = function() {
					// Create new Vendor object
					console.log('Create Vendor Called');
					var vendor = new Vendors ({
						title: $scope.title,
						firstName: $scope.firstName,
						lastName:$scope.lastName,
						phonePrimary:$scope.phonePrimary,
						phoneSecondary:$scope.phoneSecondary,
						emailPrimary:$scope.emailPrimary,
						emailSecondary:$scope.emailSecondary,
						addressLine1:$scope.addressLine1,
						addressLine2:$scope.addressLine2,
						addressLine3:$scope.addressLine3,
						addressLine4:$scope.addressLine4,
						postcode:$scope.postcode,
						country:$scope.country
					});

					// Redirect after save
					vendor.$save(function(response) {
						$location.path('vendors/' + response._id);

						// Clear form fields
						$scope.firstName = '';
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};

				// Create new Purchaser
				$scope.createPurchaser = function() {
					// Create new Purchaser object
					var purchaser = new Purchasers ({
						title: $scope.title,
						firstName: $scope.firstName,
						lastName:$scope.lastName,
						phonePrimary:$scope.phonePrimary,
						phoneSecondary:$scope.phoneSecondary,
						emailPrimary:$scope.emailPrimary,
						emailSecondary:$scope.emailSecondary,
						addressLine1:$scope.addressLine1,
						addressLine2:$scope.addressLine2,
						addressLine3:$scope.addressLine3,
						addressLine4:$scope.addressLine4,
						postcode:$scope.postcode,
						country:$scope.country
					});

					// Redirect after save
					purchaser.$save(function(response) {
						$location.path('purchasers/' + response._id);

						// Clear form fields
						$scope.name = '';
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				};
			}]
		};
	}
]);

'use strict';

// Configuring the Articles module
angular.module('properties').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Properties', 'properties', 'dropdown', '/properties(/create)?');
		Menus.addSubMenuItem('topbar', 'properties', 'List Properties', 'properties');
		Menus.addSubMenuItem('topbar', 'properties', 'New Property', 'properties/create');
	}
]);
'use strict';

//Setting up route
angular.module('properties').config(['$stateProvider',
	function($stateProvider) {
		// Properties state routing
		$stateProvider.
		state('listProperties', {
			url: '/properties',
			templateUrl: 'modules/properties/views/list-properties.client.view.html'
		}).
		state('createProperty', {
			url: '/properties/create',
			templateUrl: 'modules/properties/views/create-property.client.view.html'
		}).
		state('viewProperty', {
			url: '/properties/:propertyId',
			templateUrl: 'modules/properties/views/view-property.client.view.html'
		}).
		state('editProperty', {
			url: '/properties/:propertyId/edit',
			templateUrl: 'modules/properties/views/edit-property.client.view.html'
		});
	}
]);
'use strict';

// Properties controller
angular.module('properties').controller('PropertiesController', ['$scope', '$stateParams', '$location','$http', 'Authentication', 'Properties',
	function($scope, $stateParams, $location,$http, Authentication, Properties) {
		$scope.authentication = Authentication;

		// Create new Property
		$scope.create = function() {
			// Create new Property object
			var property = new Properties ({
				name: this.name
			});

			$scope.goNext = function(i){

				$('[href=#step'+(i+1)+']').tab('show');
				return false;

			};

			// Redirect after save
			property.$save(function(response) {
				$location.path('properties/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Property
		$scope.remove = function(property) {
			if ( property ) { 
				property.$remove();

				for (var i in $scope.properties) {
					if ($scope.properties [i] === property) {
						$scope.properties.splice(i, 1);
					}
				}
			} else {
				$scope.property.$remove(function() {
					$location.path('properties');
				});
			}
		};

		// Update existing Property
		$scope.update = function() {
			var property = $scope.property;

			property.$update(function() {
				$location.path('properties/' + property._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Properties
		$scope.find = function() {
			$scope.properties = Properties.query();
		};

		// Find existing Property
		$scope.findOne = function() {
			$scope.property = Properties.get({ 
				propertyId: $stateParams.propertyId
			});
		};
	}
]);

'use strict';

//Properties service used to communicate Properties REST endpoints
angular.module('properties').factory('Properties', ['$resource',
	function($resource) {
		return $resource('properties/:propertyId', { propertyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('purchasercontactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Purchasercontactnotes', 'purchasercontactnotes', 'dropdown', '/purchasercontactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'purchasercontactnotes', 'List Purchasercontactnotes', 'purchasercontactnotes');
		Menus.addSubMenuItem('topbar', 'purchasercontactnotes', 'New Purchasercontactnote', 'purchasercontactnotes/create');
	}
]);
'use strict';

//Setting up route
angular.module('purchasercontactnotes').config(['$stateProvider',
	function($stateProvider) {
		// Purchasercontactnotes state routing
		$stateProvider.
			state('listPurchasercontactnotes', {
				url: '/notes/purchasers',
				templateUrl: 'modules/purchasercontactnotes/views/list-purchasercontactnotes.client.view.html'
			}).
			state('createPurchasercontactnote', {
				url: '/notes/purchasers/:purchaserId/create',
				templateUrl: 'modules/purchasercontactnotes/views/create-purchasercontactnote.client.view.html'
			}).
			state('purchaserNotesView', {
				url: '/notes/purchasers/:purchaserId/view',
				templateUrl: 'modules/purchasercontactnotes/views/view-purchasercontactnote.client.view.html'
			});
	}
]);

'use strict';

// Purchasercontactnotes controller
angular.module('purchasercontactnotes').controller('PurchasercontactnotesController', ['$scope', '$stateParams', '$location', 'Authentication','Purchasers', 'Purchasercontactnotes',
	function($scope, $stateParams, $location, Authentication,Purchasers, Purchasercontactnotes) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.options = {
			secure: true,
			size: 150,
			defaultImage: 'mm'
		};

		// Create new Purchasercontactnote
		$scope.create = function() {
			// Create new Purchasercontactnote object
			var purchasercontactnote = new Purchasercontactnotes ({
				notes: this.htmlVariable,
				purchaser:$scope.purchaser._id,
			});

			// Redirect after save
			purchasercontactnote.$save(function(response) {
				$location.path('notes/purchasers/'+ $scope.purchaser._id+'/view');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Purchasercontactnote
		$scope.remove = function(purchasercontactnote) {
			if ( purchasercontactnote ) {
				purchasercontactnote.$remove();

				for (var i in $scope.purchasercontactnotes) {
					if ($scope.purchasercontactnotes [i] === purchasercontactnote) {
						$scope.purchasercontactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.purchasercontactnote.$remove(function() {
					$location.path('purchasercontactnotes');
				});
			}
		};

		// Update existing Purchasercontactnote
		$scope.update = function() {
			var purchasercontactnote = $scope.purchasercontactnote;

			purchasercontactnote.$update(function() {
				$location.path('purchasercontactnotes/' + purchasercontactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Purchasercontactnotes
		$scope.find = function() {
			$scope.purchasercontactnotes = Purchasercontactnotes.query();
		};

		// Find existing Purchasercontactnote
		$scope.findOne = function() {
			$scope.purchasercontactnote = Purchasercontactnotes.get({
				purchasercontactnoteId: $stateParams.purchasercontactnoteId
			});
		};

		// Find a list of Purchasers
		$scope.findAllPurchasers = function() {
			$scope.purchasers = Purchasers.query();
		};

		// Find existing Purchaser
		$scope.findPurchaserOne = function() {
			$scope.purchaser = Purchasers.get({
				purchaserId: $stateParams.purchaserId
			});
		};
	}
]);

'use strict';

//Purchasercontactnotes service used to communicate Purchasercontactnotes REST endpoints
angular.module('purchasercontactnotes').factory('Purchasercontactnotes', ['$resource',
	function($resource) {
		return $resource('purchasercontactnotes/:purchasercontactnoteId', { purchasercontactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('purchasers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Purchasers', 'purchasers', 'dropdown', '/purchasers(/create)?');
		Menus.addSubMenuItem('topbar', 'purchasers', 'List Purchasers', 'purchasers');
		Menus.addSubMenuItem('topbar', 'purchasers', 'New Purchaser', 'purchasers/create');
	}
]);
'use strict';

//Setting up route
angular.module('purchasers').config(['$stateProvider',
	function($stateProvider) {
		// Purchasers state routing
		$stateProvider.
		state('listPurchasers', {
			url: '/purchasers',
			templateUrl: 'modules/purchasers/views/list-purchasers.client.view.html'
		}).
		state('createPurchaser', {
			url: '/purchasers/create',
			templateUrl: 'modules/purchasers/views/create-purchaser.client.view.html'
		}).
		state('viewPurchaser', {
			url: '/purchasers/:purchaserId',
			templateUrl: 'modules/purchasers/views/view-purchaser.client.view.html'
		}).
		state('editPurchaser', {
			url: '/purchasers/:purchaserId/edit',
			templateUrl: 'modules/purchasers/views/edit-purchaser.client.view.html'
		});
	}
]);

'use strict';

// Purchasers controller
angular.module('purchasers').controller('PurchasersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Purchasers','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Purchasers, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Remove existing Purchaser
		//$scope.remove = function(purchaser) {
		//	if ( purchaser ) {
		//		purchaser.$remove();
        //
		//		for (var i in $scope.purchasers) {
		//			if ($scope.purchasers [i] === purchaser) {
		//				$scope.purchasers.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.purchaser.$remove(function() {
		//			$location.path('purchasers');
		//		});
		//	}
		//};
		//

		// Find a list of Purchasers
		$scope.find = function() {
			$scope.purchasers = Purchasers.query();
		};

		// Find existing Purchaser
		$scope.findOne = function() {
			$scope.purchaser = Purchasers.get({ 
				purchaserId: $stateParams.purchaserId
			});
		};
	}
]);

'use strict';

//Purchasers service used to communicate Purchasers REST endpoints
angular.module('purchasers').factory('Purchasers', ['$resource',
	function($resource) {
		return $resource('purchasers/:purchaserId', { purchaserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/dash');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the dash page
				$location.path('/dash');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/dash');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('vendorcontactnotes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vendorcontactnotes', 'vendorcontactnotes', 'dropdown', '/vendorcontactnotes(/create)?');
		Menus.addSubMenuItem('topbar', 'vendorcontactnotes', 'List Vendorcontactnotes', 'vendorcontactnotes');
		Menus.addSubMenuItem('topbar', 'vendorcontactnotes', 'New Vendorcontactnote', 'vendorcontactnotes/create');
	}
]);
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

'use strict';

// Vendorcontactnotes controller
angular.module('vendorcontactnotes').controller('VendorcontactnotesController', ['$scope', '$stateParams', '$location', 'Authentication','Vendors', 'Vendorcontactnotes',
	function($scope, $stateParams, $location, Authentication,Vendors, Vendorcontactnotes) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');


		// Create new Vendorcontactnote
		$scope.create = function() {
			console.log('Vendor Details'+$scope.vendor);
			// Create new Vendorcontactnote object
			var vendorcontactnote = new Vendorcontactnotes ({
				notes: this.htmlVariable,
				vendor:$scope.vendor._id,
			});

			// Redirect after save
			vendorcontactnote.$save(function(response) {
				$location.path('notes/vendors/'+ $scope.vendor._id+'/view');
				// Clear form fields
				$scope.htmlVariable = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vendorcontactnote
		$scope.remove = function(vendorcontactnote) {
			if ( vendorcontactnote ) { 
				vendorcontactnote.$remove();

				for (var i in $scope.vendorcontactnotes) {
					if ($scope.vendorcontactnotes [i] === vendorcontactnote) {
						$scope.vendorcontactnotes.splice(i, 1);
					}
				}
			} else {
				$scope.vendorcontactnote.$remove(function() {
					$location.path('vendorcontactnotes');
				});
			}
		};

		// Update existing Vendorcontactnote
		$scope.update = function() {
			var vendorcontactnote = $scope.vendorcontactnote;

			vendorcontactnote.$update(function() {
				$location.path('vendorcontactnotes/' + vendorcontactnote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Vendorcontactnotes
		$scope.find = function() {
			console.log('find');
			$scope.vendorcontactnotes = Vendorcontactnotes.query();
		};

		// Find existing Vendorcontactnote
		$scope.findOne = function() {
			$scope.vendorcontactnote = Vendorcontactnotes.get({ 
				vendorcontactnoteId: $stateParams.vendorcontactnoteId
			});
		};

		// Find existing Vendor
		$scope.findVendorOne = function() {
			$scope.vendor = Vendors.get({
				vendorId: $stateParams.vendorId
			});
		};

		//Find All Vendors
		$scope.findAllVendor = function() {
			$scope.vendors = Vendors.query();
		};

	}
]);

'use strict';

//Vendorcontactnotes service used to communicate Vendorcontactnotes REST endpoints
angular.module('vendorcontactnotes').factory('Vendorcontactnotes', ['$resource',
	function($resource) {
		return $resource('vendorcontactnotes/:vendorcontactnoteId', { vendorcontactnoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('vendors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Vendors', 'vendors', 'dropdown', '/vendors(/create)?');
		Menus.addSubMenuItem('topbar', 'vendors', 'List Vendors', 'vendors');
		Menus.addSubMenuItem('topbar', 'vendors', 'New Vendor', 'vendors/create');
	}
]);
'use strict';

//Setting up route
angular.module('vendors').config(['$stateProvider',
	function($stateProvider) {
		// Vendors state routing
		$stateProvider.
			state('listVendors', {
				url: '/vendors',
				templateUrl: 'modules/vendors/views/list-vendors.client.view.html'
			}).
			state('createVendor', {
				url: '/vendors/create',
				templateUrl: 'modules/vendors/views/create-vendor.client.view.html'
			}).
			state('viewVendor', {
				url: '/vendors/:vendorId',
				templateUrl: 'modules/vendors/views/view-vendor.client.view.html'
			}).
			state('editVendor', {
				url: '/vendors/:vendorId/edit',
				templateUrl: 'modules/vendors/views/edit-vendor.client.view.html'
			});
	}
]);

'use strict';

// // Vendors controller
angular.module('vendors').controller('VendorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Vendors','$q', '$timeout',
	function($scope, $stateParams, $location, Authentication, Vendors, $q, $timeout) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//// Remove existing Vendor
		//$scope.remove = function(vendor) {
		//	if ( vendor ) {
		//		vendor.$remove();
        //
		//		for (var i in $scope.vendors) {
		//			if ($scope.vendors [i] === vendor) {
		//				$scope.vendors.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.vendor.$remove(function() {
		//			$location.path('vendors');
		//		});
		//	}
		//};

		// Find a list of Vendors
		$scope.find = function() {
			$scope.vendors = Vendors.query();
		};

		// Find existing Vendor
		$scope.findOne = function() {
			$scope.vendor = Vendors.get({
				vendorId: $stateParams.vendorId
			});
		};
	}
]);

'use strict';

//Vendors service used to communicate Vendors REST endpoints
angular.module('vendors').factory('Vendors', ['$resource',
	function($resource) {
		return $resource('vendors/:vendorId', { vendorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);