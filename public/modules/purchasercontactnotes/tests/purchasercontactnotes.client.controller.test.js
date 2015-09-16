'use strict';

(function() {
	// Purchasercontactnotes Controller Spec
	describe('Purchasercontactnotes Controller Tests', function() {
		// Initialize global variables
		var PurchasercontactnotesController,
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

			// Initialize the Purchasercontactnotes controller.
			PurchasercontactnotesController = $controller('PurchasercontactnotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Purchasercontactnote object fetched from XHR', inject(function(Purchasercontactnotes) {
			// Create sample Purchasercontactnote using the Purchasercontactnotes service
			var samplePurchasercontactnote = new Purchasercontactnotes({
				name: 'New Purchasercontactnote'
			});

			// Create a sample Purchasercontactnotes array that includes the new Purchasercontactnote
			var samplePurchasercontactnotes = [samplePurchasercontactnote];

			// Set GET response
			$httpBackend.expectGET('purchasercontactnotes').respond(samplePurchasercontactnotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchasercontactnotes).toEqualData(samplePurchasercontactnotes);
		}));

		it('$scope.findOne() should create an array with one Purchasercontactnote object fetched from XHR using a purchasercontactnoteId URL parameter', inject(function(Purchasercontactnotes) {
			// Define a sample Purchasercontactnote object
			var samplePurchasercontactnote = new Purchasercontactnotes({
				name: 'New Purchasercontactnote'
			});

			// Set the URL parameter
			$stateParams.purchasercontactnoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/purchasercontactnotes\/([0-9a-fA-F]{24})$/).respond(samplePurchasercontactnote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.purchasercontactnote).toEqualData(samplePurchasercontactnote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Purchasercontactnotes) {
			// Create a sample Purchasercontactnote object
			var samplePurchasercontactnotePostData = new Purchasercontactnotes({
				name: 'New Purchasercontactnote'
			});

			// Create a sample Purchasercontactnote response
			var samplePurchasercontactnoteResponse = new Purchasercontactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchasercontactnote'
			});

			// Fixture mock form input values
			scope.name = 'New Purchasercontactnote';

			// Set POST response
			$httpBackend.expectPOST('purchasercontactnotes', samplePurchasercontactnotePostData).respond(samplePurchasercontactnoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Purchasercontactnote was created
			expect($location.path()).toBe('/purchasercontactnotes/' + samplePurchasercontactnoteResponse._id);
		}));

		it('$scope.update() should update a valid Purchasercontactnote', inject(function(Purchasercontactnotes) {
			// Define a sample Purchasercontactnote put data
			var samplePurchasercontactnotePutData = new Purchasercontactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Purchasercontactnote'
			});

			// Mock Purchasercontactnote in scope
			scope.purchasercontactnote = samplePurchasercontactnotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/purchasercontactnotes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/purchasercontactnotes/' + samplePurchasercontactnotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid purchasercontactnoteId and remove the Purchasercontactnote from the scope', inject(function(Purchasercontactnotes) {
			// Create new Purchasercontactnote object
			var samplePurchasercontactnote = new Purchasercontactnotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Purchasercontactnotes array and include the Purchasercontactnote
			scope.purchasercontactnotes = [samplePurchasercontactnote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/purchasercontactnotes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePurchasercontactnote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.purchasercontactnotes.length).toBe(0);
		}));
	});
}());