'use strict';

(function() {
	// Purchasers Controller Spec
	describe('Purchasers Controller Tests', function() {
		// Initialize global variables
		var PurchasersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Purchasers controller.
			PurchasersController = $controller('PurchasersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Purchaser object fetched from XHR', inject(function(Purchasers) {
			// Create sample Purchaser using the Purchasers service
			var samplePurchaser = new Purchasers({
				name: 'New Purchaser'
			});

			// Create a sample Purchasers array that includes the new Purchaser
			var samplePurchasers = [samplePurchaser];

			// Set GET response
			$httpBackend.expectGET('purchasers').respond(samplePurchasers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchasers).toEqualData(samplePurchasers);
		}));

		it('$scope.findOne() should create an array with one Purchaser object fetched from XHR using a purchaserId URL parameter', inject(function(Purchasers) {
			// Define a sample Purchaser object
			var samplePurchaser = new Purchasers({
				name: 'New Purchaser'
			});

			// Set the URL parameter
			$stateParams.purchaserId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/purchasers\/([0-9a-fA-F]{24})$/).respond(samplePurchaser);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchaser).toEqualData(samplePurchaser);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Purchasers) {
			// Create a sample Purchaser object
			var samplePurchaserPostData = new Purchasers({
				name: 'New Purchaser'
			});

			// Create a sample Purchaser response
			var samplePurchaserResponse = new Purchasers({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchaser'
			});

			// Fixture mock form input values
			scope.name = 'New Purchaser';

			// Set POST response
			$httpBackend.expectPOST('purchasers', samplePurchaserPostData).respond(samplePurchaserResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Purchaser was created
			expect($location.path()).toBe('/purchasers/' + samplePurchaserResponse._id);
		}));

		it('$scope.update() should update a valid Purchaser', inject(function(Purchasers) {
			// Define a sample Purchaser put data
			var samplePurchaserPutData = new Purchasers({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchaser'
			});

			// Mock Purchaser in scope
			scope.purchaser = samplePurchaserPutData;

			// Set PUT response
			$httpBackend.expectPUT(/purchasers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/purchasers/' + samplePurchaserPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid purchaserId and remove the Purchaser from the scope', inject(function(Purchasers) {
			// Create new Purchaser object
			var samplePurchaser = new Purchasers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Purchasers array and include the Purchaser
			scope.purchasers = [samplePurchaser];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/purchasers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePurchaser);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.purchasers.length).toBe(0);
		}));
	});
}());