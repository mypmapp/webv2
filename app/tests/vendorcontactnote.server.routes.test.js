'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Vendorcontactnote = mongoose.model('Vendorcontactnote'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, vendorcontactnote;

/**
 * Vendorcontactnote routes tests
 */
describe('Vendorcontactnote CRUD tests', function() {
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

		// Save a user to the test db and create new Vendorcontactnote
		user.save(function() {
			vendorcontactnote = {
				name: 'Vendorcontactnote Name'
			};

			done();
		});
	});

	it('should be able to save Vendorcontactnote instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vendorcontactnote
				agent.post('/vendorcontactnotes')
					.send(vendorcontactnote)
					.expect(200)
					.end(function(vendorcontactnoteSaveErr, vendorcontactnoteSaveRes) {
						// Handle Vendorcontactnote save error
						if (vendorcontactnoteSaveErr) done(vendorcontactnoteSaveErr);

						// Get a list of Vendorcontactnotes
						agent.get('/vendorcontactnotes')
							.end(function(vendorcontactnotesGetErr, vendorcontactnotesGetRes) {
								// Handle Vendorcontactnote save error
								if (vendorcontactnotesGetErr) done(vendorcontactnotesGetErr);

								// Get Vendorcontactnotes list
								var vendorcontactnotes = vendorcontactnotesGetRes.body;

								// Set assertions
								(vendorcontactnotes[0].user._id).should.equal(userId);
								(vendorcontactnotes[0].name).should.match('Vendorcontactnote Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Vendorcontactnote instance if not logged in', function(done) {
		agent.post('/vendorcontactnotes')
			.send(vendorcontactnote)
			.expect(401)
			.end(function(vendorcontactnoteSaveErr, vendorcontactnoteSaveRes) {
				// Call the assertion callback
				done(vendorcontactnoteSaveErr);
			});
	});

	it('should not be able to save Vendorcontactnote instance if no name is provided', function(done) {
		// Invalidate name field
		vendorcontactnote.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vendorcontactnote
				agent.post('/vendorcontactnotes')
					.send(vendorcontactnote)
					.expect(400)
					.end(function(vendorcontactnoteSaveErr, vendorcontactnoteSaveRes) {
						// Set message assertion
						(vendorcontactnoteSaveRes.body.message).should.match('Please fill Vendorcontactnote name');
						
						// Handle Vendorcontactnote save error
						done(vendorcontactnoteSaveErr);
					});
			});
	});

	it('should be able to update Vendorcontactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vendorcontactnote
				agent.post('/vendorcontactnotes')
					.send(vendorcontactnote)
					.expect(200)
					.end(function(vendorcontactnoteSaveErr, vendorcontactnoteSaveRes) {
						// Handle Vendorcontactnote save error
						if (vendorcontactnoteSaveErr) done(vendorcontactnoteSaveErr);

						// Update Vendorcontactnote name
						vendorcontactnote.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Vendorcontactnote
						agent.put('/vendorcontactnotes/' + vendorcontactnoteSaveRes.body._id)
							.send(vendorcontactnote)
							.expect(200)
							.end(function(vendorcontactnoteUpdateErr, vendorcontactnoteUpdateRes) {
								// Handle Vendorcontactnote update error
								if (vendorcontactnoteUpdateErr) done(vendorcontactnoteUpdateErr);

								// Set assertions
								(vendorcontactnoteUpdateRes.body._id).should.equal(vendorcontactnoteSaveRes.body._id);
								(vendorcontactnoteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Vendorcontactnotes if not signed in', function(done) {
		// Create new Vendorcontactnote model instance
		var vendorcontactnoteObj = new Vendorcontactnote(vendorcontactnote);

		// Save the Vendorcontactnote
		vendorcontactnoteObj.save(function() {
			// Request Vendorcontactnotes
			request(app).get('/vendorcontactnotes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Vendorcontactnote if not signed in', function(done) {
		// Create new Vendorcontactnote model instance
		var vendorcontactnoteObj = new Vendorcontactnote(vendorcontactnote);

		// Save the Vendorcontactnote
		vendorcontactnoteObj.save(function() {
			request(app).get('/vendorcontactnotes/' + vendorcontactnoteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', vendorcontactnote.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Vendorcontactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Vendorcontactnote
				agent.post('/vendorcontactnotes')
					.send(vendorcontactnote)
					.expect(200)
					.end(function(vendorcontactnoteSaveErr, vendorcontactnoteSaveRes) {
						// Handle Vendorcontactnote save error
						if (vendorcontactnoteSaveErr) done(vendorcontactnoteSaveErr);

						// Delete existing Vendorcontactnote
						agent.delete('/vendorcontactnotes/' + vendorcontactnoteSaveRes.body._id)
							.send(vendorcontactnote)
							.expect(200)
							.end(function(vendorcontactnoteDeleteErr, vendorcontactnoteDeleteRes) {
								// Handle Vendorcontactnote error error
								if (vendorcontactnoteDeleteErr) done(vendorcontactnoteDeleteErr);

								// Set assertions
								(vendorcontactnoteDeleteRes.body._id).should.equal(vendorcontactnoteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Vendorcontactnote instance if not signed in', function(done) {
		// Set Vendorcontactnote user 
		vendorcontactnote.user = user;

		// Create new Vendorcontactnote model instance
		var vendorcontactnoteObj = new Vendorcontactnote(vendorcontactnote);

		// Save the Vendorcontactnote
		vendorcontactnoteObj.save(function() {
			// Try deleting Vendorcontactnote
			request(app).delete('/vendorcontactnotes/' + vendorcontactnoteObj._id)
			.expect(401)
			.end(function(vendorcontactnoteDeleteErr, vendorcontactnoteDeleteRes) {
				// Set message assertion
				(vendorcontactnoteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Vendorcontactnote error error
				done(vendorcontactnoteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Vendorcontactnote.remove().exec();
		done();
	});
});