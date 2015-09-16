'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Property = mongoose.model('Property'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, property;

/**
 * Property routes tests
 */
describe('Property CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Property
		user.save(function() {
			property = {
				name: 'Property Name'
			};

			done();
		});
	});

	it('should be able to save Property instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Property
				agent.post('/properties')
					.send(property)
					.expect(200)
					.end(function(propertySaveErr, propertySaveRes) {
						// Handle Property save error
						if (propertySaveErr) done(propertySaveErr);

						// Get a list of Properties
						agent.get('/properties')
							.end(function(propertiesGetErr, propertiesGetRes) {
								// Handle Property save error
								if (propertiesGetErr) done(propertiesGetErr);

								// Get Properties list
								var properties = propertiesGetRes.body;

								// Set assertions
								(properties[0].user._id).should.equal(userId);
								(properties[0].name).should.match('Property Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Property instance if not logged in', function(done) {
		agent.post('/properties')
			.send(property)
			.expect(401)
			.end(function(propertySaveErr, propertySaveRes) {
				// Call the assertion callback
				done(propertySaveErr);
			});
	});

	it('should not be able to save Property instance if no name is provided', function(done) {
		// Invalidate name field
		property.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Property
				agent.post('/properties')
					.send(property)
					.expect(400)
					.end(function(propertySaveErr, propertySaveRes) {
						// Set message assertion
						(propertySaveRes.body.message).should.match('Please fill Property name');
						
						// Handle Property save error
						done(propertySaveErr);
					});
			});
	});

	it('should be able to update Property instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Property
				agent.post('/properties')
					.send(property)
					.expect(200)
					.end(function(propertySaveErr, propertySaveRes) {
						// Handle Property save error
						if (propertySaveErr) done(propertySaveErr);

						// Update Property name
						property.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Property
						agent.put('/properties/' + propertySaveRes.body._id)
							.send(property)
							.expect(200)
							.end(function(propertyUpdateErr, propertyUpdateRes) {
								// Handle Property update error
								if (propertyUpdateErr) done(propertyUpdateErr);

								// Set assertions
								(propertyUpdateRes.body._id).should.equal(propertySaveRes.body._id);
								(propertyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Properties if not signed in', function(done) {
		// Create new Property model instance
		var propertyObj = new Property(property);

		// Save the Property
		propertyObj.save(function() {
			// Request Properties
			request(app).get('/properties')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Property if not signed in', function(done) {
		// Create new Property model instance
		var propertyObj = new Property(property);

		// Save the Property
		propertyObj.save(function() {
			request(app).get('/properties/' + propertyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', property.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Property instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Property
				agent.post('/properties')
					.send(property)
					.expect(200)
					.end(function(propertySaveErr, propertySaveRes) {
						// Handle Property save error
						if (propertySaveErr) done(propertySaveErr);

						// Delete existing Property
						agent.delete('/properties/' + propertySaveRes.body._id)
							.send(property)
							.expect(200)
							.end(function(propertyDeleteErr, propertyDeleteRes) {
								// Handle Property error error
								if (propertyDeleteErr) done(propertyDeleteErr);

								// Set assertions
								(propertyDeleteRes.body._id).should.equal(propertySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Property instance if not signed in', function(done) {
		// Set Property user 
		property.user = user;

		// Create new Property model instance
		var propertyObj = new Property(property);

		// Save the Property
		propertyObj.save(function() {
			// Try deleting Property
			request(app).delete('/properties/' + propertyObj._id)
			.expect(401)
			.end(function(propertyDeleteErr, propertyDeleteRes) {
				// Set message assertion
				(propertyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Property error error
				done(propertyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Property.remove().exec();
		done();
	});
});