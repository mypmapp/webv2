'use strict';

(function() {
	// Contactnotes Controller Spec
	describe('Contactnotes Controller Tests', function() {
		// Initialize global variables
		var ContactnotesController,
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

			// Initialize the Contactnotes controller.
			ContactnotesController = $controller('ContactnotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contactnote object fetched from XHR', inject(function(Contactnotes) {
			// Create sample Contactnote using the Contactnotes service
			var sampleContactnote = new Contactnotes({
				name: 'New Contactnote'
			});

			// Create a sample Contactnotes array that includes the new Contactnote
			var sampleContactnotes = [sampleContactnote];

			// Set GET response
			$httpBackend.expectGET('contactnotes').respond(sampleContactnotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contactnotes).toEqualData(sampleContactnotes);
		}));

		it('$scope.findOne() should create an array with one Contactnote object fetched from XHR using a contactnoteId URL parameter', inject(function(Contactnotes) {
			// Define a sample Contactnote object
			var sampleContactnote = new Contactnotes({
				name: 'New Contactnote'
			});

			// Set the URL parameter
			$stateParams.contactnoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contactnotes\/([0-9a-fA-F]{24})$/).respond(sampleContactnote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contactnote).toEqualData(sampleContactnote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contactnotes) {
			// Create a sample Contactnote object
			var sampleContactnotePostData = new Contactnotes({
				name: 'New Contactnote'
			});

			// Create a sample Contactnote response
			var sampleContactnoteResponse = new Contactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Contactnote'
			});

			// Fixture mock form input values
			scope.name = 'New Contactnote';

			// Set POST response
			$httpBackend.expectPOST('contactnotes', sampleContactnotePostData).respond(sampleContactnoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contactnote was created
			expect($location.path()).toBe('/contactnotes/' + sampleContactnoteResponse._id);
		}));

		it('$scope.update() should update a valid Contactnote', inject(function(Contactnotes) {
			// Define a sample Contactnote put data
			var sampleContactnotePutData = new Contactnotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Contactnote'
			});

			// Mock Contactnote in scope
			scope.contactnote = sampleContactnotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/contactnotes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contactnotes/' + sampleContactnotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contactnoteId and remove the Contactnote from the scope', inject(function(Contactnotes) {
			// Create new Contactnote object
			var sampleContactnote = new Contactnotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contactnotes array and include the Contactnote
			scope.contactnotes = [sampleContactnote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contactnotes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContactnote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contactnotes.length).toBe(0);
		}));
	});
}());