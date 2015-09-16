'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Purchasercontactnote = mongoose.model('Purchasercontactnote'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, purchasercontactnote;

/**
 * Purchasercontactnote routes tests
 */
describe('Purchasercontactnote CRUD tests', function() {
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

		// Save a user to the test db and create new Purchasercontactnote
		user.save(function() {
			purchasercontactnote = {
				name: 'Purchasercontactnote Name'
			};

			done();
		});
	});

	it('should be able to save Purchasercontactnote instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchasercontactnote
				agent.post('/purchasercontactnotes')
					.send(purchasercontactnote)
					.expect(200)
					.end(function(purchasercontactnoteSaveErr, purchasercontactnoteSaveRes) {
						// Handle Purchasercontactnote save error
						if (purchasercontactnoteSaveErr) done(purchasercontactnoteSaveErr);

						// Get a list of Purchasercontactnotes
						agent.get('/purchasercontactnotes')
							.end(function(purchasercontactnotesGetErr, purchasercontactnotesGetRes) {
								// Handle Purchasercontactnote save error
								if (purchasercontactnotesGetErr) done(purchasercontactnotesGetErr);

								// Get Purchasercontactnotes list
								var purchasercontactnotes = purchasercontactnotesGetRes.body;

								// Set assertions
								(purchasercontactnotes[0].user._id).should.equal(userId);
								(purchasercontactnotes[0].name).should.match('Purchasercontactnote Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Purchasercontactnote instance if not logged in', function(done) {
		agent.post('/purchasercontactnotes')
			.send(purchasercontactnote)
			.expect(401)
			.end(function(purchasercontactnoteSaveErr, purchasercontactnoteSaveRes) {
				// Call the assertion callback
				done(purchasercontactnoteSaveErr);
			});
	});

	it('should not be able to save Purchasercontactnote instance if no name is provided', function(done) {
		// Invalidate name field
		purchasercontactnote.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchasercontactnote
				agent.post('/purchasercontactnotes')
					.send(purchasercontactnote)
					.expect(400)
					.end(function(purchasercontactnoteSaveErr, purchasercontactnoteSaveRes) {
						// Set message assertion
						(purchasercontactnoteSaveRes.body.message).should.match('Please fill Purchasercontactnote name');
						
						// Handle Purchasercontactnote save error
						done(purchasercontactnoteSaveErr);
					});
			});
	});

	it('should be able to update Purchasercontactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchasercontactnote
				agent.post('/purchasercontactnotes')
					.send(purchasercontactnote)
					.expect(200)
					.end(function(purchasercontactnoteSaveErr, purchasercontactnoteSaveRes) {
						// Handle Purchasercontactnote save error
						if (purchasercontactnoteSaveErr) done(purchasercontactnoteSaveErr);

						// Update Purchasercontactnote name
						purchasercontactnote.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Purchasercontactnote
						agent.put('/purchasercontactnotes/' + purchasercontactnoteSaveRes.body._id)
							.send(purchasercontactnote)
							.expect(200)
							.end(function(purchasercontactnoteUpdateErr, purchasercontactnoteUpdateRes) {
								// Handle Purchasercontactnote update error
								if (purchasercontactnoteUpdateErr) done(purchasercontactnoteUpdateErr);

								// Set assertions
								(purchasercontactnoteUpdateRes.body._id).should.equal(purchasercontactnoteSaveRes.body._id);
								(purchasercontactnoteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Purchasercontactnotes if not signed in', function(done) {
		// Create new Purchasercontactnote model instance
		var purchasercontactnoteObj = new Purchasercontactnote(purchasercontactnote);

		// Save the Purchasercontactnote
		purchasercontactnoteObj.save(function() {
			// Request Purchasercontactnotes
			request(app).get('/purchasercontactnotes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Purchasercontactnote if not signed in', function(done) {
		// Create new Purchasercontactnote model instance
		var purchasercontactnoteObj = new Purchasercontactnote(purchasercontactnote);

		// Save the Purchasercontactnote
		purchasercontactnoteObj.save(function() {
			request(app).get('/purchasercontactnotes/' + purchasercontactnoteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', purchasercontactnote.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Purchasercontactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchasercontactnote
				agent.post('/purchasercontactnotes')
					.send(purchasercontactnote)
					.expect(200)
					.end(function(purchasercontactnoteSaveErr, purchasercontactnoteSaveRes) {
						// Handle Purchasercontactnote save error
						if (purchasercontactnoteSaveErr) done(purchasercontactnoteSaveErr);

						// Delete existing Purchasercontactnote
						agent.delete('/purchasercontactnotes/' + purchasercontactnoteSaveRes.body._id)
							.send(purchasercontactnote)
							.expect(200)
							.end(function(purchasercontactnoteDeleteErr, purchasercontactnoteDeleteRes) {
								// Handle Purchasercontactnote error error
								if (purchasercontactnoteDeleteErr) done(purchasercontactnoteDeleteErr);

								// Set assertions
								(purchasercontactnoteDeleteRes.body._id).should.equal(purchasercontactnoteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Purchasercontactnote instance if not signed in', function(done) {
		// Set Purchasercontactnote user 
		purchasercontactnote.user = user;

		// Create new Purchasercontactnote model instance
		var purchasercontactnoteObj = new Purchasercontactnote(purchasercontactnote);

		// Save the Purchasercontactnote
		purchasercontactnoteObj.save(function() {
			// Try deleting Purchasercontactnote
			request(app).delete('/purchasercontactnotes/' + purchasercontactnoteObj._id)
			.expect(401)
			.end(function(purchasercontactnoteDeleteErr, purchasercontactnoteDeleteRes) {
				// Set message assertion
				(purchasercontactnoteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Purchasercontactnote error error
				done(purchasercontactnoteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Purchasercontactnote.remove().exec();
		done();
	});
});