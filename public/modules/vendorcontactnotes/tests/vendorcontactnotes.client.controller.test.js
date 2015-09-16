'use strict';

(function() {
	// Vendorcontactnotes Controller Spec
	describe('Vendorcontactnotes Controller Tests', function() {
		// Initialize global variables
		var VendorcontactnotesController,
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

			// Initialize the Vendorcontactnotes controller.
			VendorcontactnotesController = $controller('VendorcontactnotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Vendorcontactnote object fetched from XHR', inject(function(Vendorcontactnotes) {
			// Create sample Vendorcontactnote using the Vendorcontactnotes service
			var sampleVendorcontactnote = new Vendorcontactnotes({
				name: 'New Vendorcontactnote'
			});

			// Create a sample Vendorcontactnotes array that includes the new Vendorcontactnote
			var sampleVendorcontactnotes = [sampleVendorcontactnote];

			// Set GET response
			$httpBackend.expectGET('vendorcontactnotes').respond(sampleVendorcontactnotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vendorcontactnotes).toEqualData(sampleVendorcontactnotes);
		}));

		it('$scope.findOne() should create an array with one Vendorcontactnote object fetched from XHR using a vendorcontactnoteId URL parameter', inject(function(Vendorcontactnotes) {
			// Define a sample Vendorcontactnote object
			var sampleVendorcontactnote = new Vendorcontactnotes({
				name: 'New Vendorcontactnote'
			});

			// Set the URL parameter
			$stateParams.vendorcontactnoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/vendorcontactnotes\/([0-9a-fA-F]{24})$/).respond(sampleVendorcontactnote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.vendorcontactnote).toEqualData(sampleVendorcontactnote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Vendorcontactnotes) {
			// Create a sample Vendorcontactnote object
			var sampleVendorcontactnotePostData = new Vendorcontactnotes({
				name: 'New Vendorcontactnote'
			});

			// Create a sample Vendorcontactnote response
			var sampleVendorcontactnoteResponse = new Vendorcontactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Vendorcontactnote'
			});

			// Fixture mock form input values
			scope.name = 'New Vendorcontactnote';

			// Set POST response
			$httpBackend.expectPOST('vendorcontactnotes', sampleVendorcontactnotePostData).respond(sampleVendorcontactnoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Vendorcontactnote was created
			expect($location.path()).toBe('/vendorcontactnotes/' + sampleVendorcontactnoteResponse._id);
		}));

		it('$scope.update() should update a valid Vendorcontactnote', inject(function(Vendorcontactnotes) {
			// Define a sample Vendorcontactnote put data
			var sampleVendorcontactnotePutData = new Vendorcontactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Vendorcontactnote'
			});

			// Mock Vendorcontactnote in scope
			scope.vendorcontactnote = sampleVendorcontactnotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/vendorcontactnotes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/vendorcontactnotes/' + sampleVendorcontactnotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid vendorcontactnoteId and remove the Vendorcontactnote from the scope', inject(function(Vendorcontactnotes) {
			// Create new Vendorcontactnote object
			var sampleVendorcontactnote = new Vendorcontactnotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Vendorcontactnotes array and include the Vendorcontactnote
			scope.vendorcontactnotes = [sampleVendorcontactnote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/vendorcontactnotes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVendorcontactnote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.vendorcontactnotes.length).toBe(0);
		}));
	});
}());