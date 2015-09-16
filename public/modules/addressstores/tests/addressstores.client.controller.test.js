'use strict';

(function() {
	// Addressstores Controller Spec
	describe('Addressstores Controller Tests', function() {
		// Initialize global variables
		var AddressstoresController,
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

			// Initialize the Addressstores controller.
			AddressstoresController = $controller('AddressstoresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Addressstore object fetched from XHR', inject(function(Addressstores) {
			// Create sample Addressstore using the Addressstores service
			var sampleAddressstore = new Addressstores({
				name: 'New Addressstore'
			});

			// Create a sample Addressstores array that includes the new Addressstore
			var sampleAddressstores = [sampleAddressstore];

			// Set GET response
			$httpBackend.expectGET('addressstores').respond(sampleAddressstores);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addressstores).toEqualData(sampleAddressstores);
		}));

		it('$scope.findOne() should create an array with one Addressstore object fetched from XHR using a addressstoreId URL parameter', inject(function(Addressstores) {
			// Define a sample Addressstore object
			var sampleAddressstore = new Addressstores({
				name: 'New Addressstore'
			});

			// Set the URL parameter
			$stateParams.addressstoreId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/addressstores\/([0-9a-fA-F]{24})$/).respond(sampleAddressstore);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.addressstore).toEqualData(sampleAddressstore);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Addressstores) {
			// Create a sample Addressstore object
			var sampleAddressstorePostData = new Addressstores({
				name: 'New Addressstore'
			});

			// Create a sample Addressstore response
			var sampleAddressstoreResponse = new Addressstores({
				_id: '525cf20451979dea2c000001',
				name: 'New Addressstore'
			});

			// Fixture mock form input values
			scope.name = 'New Addressstore';

			// Set POST response
			$httpBackend.expectPOST('addressstores', sampleAddressstorePostData).respond(sampleAddressstoreResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Addressstore was created
			expect($location.path()).toBe('/addressstores/' + sampleAddressstoreResponse._id);
		}));

		it('$scope.update() should update a valid Addressstore', inject(function(Addressstores) {
			// Define a sample Addressstore put data
			var sampleAddressstorePutData = new Addressstores({
				_id: '525cf20451979dea2c000001',
				name: 'New Addressstore'
			});

			// Mock Addressstore in scope
			scope.addressstore = sampleAddressstorePutData;

			// Set PUT response
			$httpBackend.expectPUT(/addressstores\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/addressstores/' + sampleAddressstorePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid addressstoreId and remove the Addressstore from the scope', inject(function(Addressstores) {
			// Create new Addressstore object
			var sampleAddressstore = new Addressstores({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Addressstores array and include the Addressstore
			scope.addressstores = [sampleAddressstore];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/addressstores\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAddressstore);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.addressstores.length).toBe(0);
		}));
	});
}());