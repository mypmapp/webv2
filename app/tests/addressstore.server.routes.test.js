'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Addressstore = mongoose.model('Addressstore'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, addressstore;

/**
 * Addressstore routes tests
 */
describe('Addressstore CRUD tests', function() {
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

		// Save a user to the test db and create new Addressstore
		user.save(function() {
			addressstore = {
				name: 'Addressstore Name'
			};

			done();
		});
	});

	it('should be able to save Addressstore instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addressstore
				agent.post('/addressstores')
					.send(addressstore)
					.expect(200)
					.end(function(addressstoreSaveErr, addressstoreSaveRes) {
						// Handle Addressstore save error
						if (addressstoreSaveErr) done(addressstoreSaveErr);

						// Get a list of Addressstores
						agent.get('/addressstores')
							.end(function(addressstoresGetErr, addressstoresGetRes) {
								// Handle Addressstore save error
								if (addressstoresGetErr) done(addressstoresGetErr);

								// Get Addressstores list
								var addressstores = addressstoresGetRes.body;

								// Set assertions
								(addressstores[0].user._id).should.equal(userId);
								(addressstores[0].name).should.match('Addressstore Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Addressstore instance if not logged in', function(done) {
		agent.post('/addressstores')
			.send(addressstore)
			.expect(401)
			.end(function(addressstoreSaveErr, addressstoreSaveRes) {
				// Call the assertion callback
				done(addressstoreSaveErr);
			});
	});

	it('should not be able to save Addressstore instance if no name is provided', function(done) {
		// Invalidate name field
		addressstore.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addressstore
				agent.post('/addressstores')
					.send(addressstore)
					.expect(400)
					.end(function(addressstoreSaveErr, addressstoreSaveRes) {
						// Set message assertion
						(addressstoreSaveRes.body.message).should.match('Please fill Addressstore name');
						
						// Handle Addressstore save error
						done(addressstoreSaveErr);
					});
			});
	});

	it('should be able to update Addressstore instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addressstore
				agent.post('/addressstores')
					.send(addressstore)
					.expect(200)
					.end(function(addressstoreSaveErr, addressstoreSaveRes) {
						// Handle Addressstore save error
						if (addressstoreSaveErr) done(addressstoreSaveErr);

						// Update Addressstore name
						addressstore.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Addressstore
						agent.put('/addressstores/' + addressstoreSaveRes.body._id)
							.send(addressstore)
							.expect(200)
							.end(function(addressstoreUpdateErr, addressstoreUpdateRes) {
								// Handle Addressstore update error
								if (addressstoreUpdateErr) done(addressstoreUpdateErr);

								// Set assertions
								(addressstoreUpdateRes.body._id).should.equal(addressstoreSaveRes.body._id);
								(addressstoreUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Addressstores if not signed in', function(done) {
		// Create new Addressstore model instance
		var addressstoreObj = new Addressstore(addressstore);

		// Save the Addressstore
		addressstoreObj.save(function() {
			// Request Addressstores
			request(app).get('/addressstores')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Addressstore if not signed in', function(done) {
		// Create new Addressstore model instance
		var addressstoreObj = new Addressstore(addressstore);

		// Save the Addressstore
		addressstoreObj.save(function() {
			request(app).get('/addressstores/' + addressstoreObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', addressstore.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Addressstore instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addressstore
				agent.post('/addressstores')
					.send(addressstore)
					.expect(200)
					.end(function(addressstoreSaveErr, addressstoreSaveRes) {
						// Handle Addressstore save error
						if (addressstoreSaveErr) done(addressstoreSaveErr);

						// Delete existing Addressstore
						agent.delete('/addressstores/' + addressstoreSaveRes.body._id)
							.send(addressstore)
							.expect(200)
							.end(function(addressstoreDeleteErr, addressstoreDeleteRes) {
								// Handle Addressstore error error
								if (addressstoreDeleteErr) done(addressstoreDeleteErr);

								// Set assertions
								(addressstoreDeleteRes.body._id).should.equal(addressstoreSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Addressstore instance if not signed in', function(done) {
		// Set Addressstore user 
		addressstore.user = user;

		// Create new Addressstore model instance
		var addressstoreObj = new Addressstore(addressstore);

		// Save the Addressstore
		addressstoreObj.save(function() {
			// Try deleting Addressstore
			request(app).delete('/addressstores/' + addressstoreObj._id)
			.expect(401)
			.end(function(addressstoreDeleteErr, addressstoreDeleteRes) {
				// Set message assertion
				(addressstoreDeleteRes.body.message).should.match('User is not logged in');

				// Handle Addressstore error error
				done(addressstoreDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Addressstore.remove().exec();
		done();
	});
});