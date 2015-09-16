'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contactnote = mongoose.model('Contactnote'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, contactnote;

/**
 * Contactnote routes tests
 */
describe('Contactnote CRUD tests', function() {
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

		// Save a user to the test db and create new Contactnote
		user.save(function() {
			contactnote = {
				name: 'Contactnote Name'
			};

			done();
		});
	});

	it('should be able to save Contactnote instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contactnote
				agent.post('/contactnotes')
					.send(contactnote)
					.expect(200)
					.end(function(contactnoteSaveErr, contactnoteSaveRes) {
						// Handle Contactnote save error
						if (contactnoteSaveErr) done(contactnoteSaveErr);

						// Get a list of Contactnotes
						agent.get('/contactnotes')
							.end(function(contactnotesGetErr, contactnotesGetRes) {
								// Handle Contactnote save error
								if (contactnotesGetErr) done(contactnotesGetErr);

								// Get Contactnotes list
								var contactnotes = contactnotesGetRes.body;

								// Set assertions
								(contactnotes[0].user._id).should.equal(userId);
								(contactnotes[0].name).should.match('Contactnote Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Contactnote instance if not logged in', function(done) {
		agent.post('/contactnotes')
			.send(contactnote)
			.expect(401)
			.end(function(contactnoteSaveErr, contactnoteSaveRes) {
				// Call the assertion callback
				done(contactnoteSaveErr);
			});
	});

	it('should not be able to save Contactnote instance if no name is provided', function(done) {
		// Invalidate name field
		contactnote.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contactnote
				agent.post('/contactnotes')
					.send(contactnote)
					.expect(400)
					.end(function(contactnoteSaveErr, contactnoteSaveRes) {
						// Set message assertion
						(contactnoteSaveRes.body.message).should.match('Please fill Contactnote name');
						
						// Handle Contactnote save error
						done(contactnoteSaveErr);
					});
			});
	});

	it('should be able to update Contactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contactnote
				agent.post('/contactnotes')
					.send(contactnote)
					.expect(200)
					.end(function(contactnoteSaveErr, contactnoteSaveRes) {
						// Handle Contactnote save error
						if (contactnoteSaveErr) done(contactnoteSaveErr);

						// Update Contactnote name
						contactnote.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Contactnote
						agent.put('/contactnotes/' + contactnoteSaveRes.body._id)
							.send(contactnote)
							.expect(200)
							.end(function(contactnoteUpdateErr, contactnoteUpdateRes) {
								// Handle Contactnote update error
								if (contactnoteUpdateErr) done(contactnoteUpdateErr);

								// Set assertions
								(contactnoteUpdateRes.body._id).should.equal(contactnoteSaveRes.body._id);
								(contactnoteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Contactnotes if not signed in', function(done) {
		// Create new Contactnote model instance
		var contactnoteObj = new Contactnote(contactnote);

		// Save the Contactnote
		contactnoteObj.save(function() {
			// Request Contactnotes
			request(app).get('/contactnotes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Contactnote if not signed in', function(done) {
		// Create new Contactnote model instance
		var contactnoteObj = new Contactnote(contactnote);

		// Save the Contactnote
		contactnoteObj.save(function() {
			request(app).get('/contactnotes/' + contactnoteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', contactnote.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Contactnote instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contactnote
				agent.post('/contactnotes')
					.send(contactnote)
					.expect(200)
					.end(function(contactnoteSaveErr, contactnoteSaveRes) {
						// Handle Contactnote save error
						if (contactnoteSaveErr) done(contactnoteSaveErr);

						// Delete existing Contactnote
						agent.delete('/contactnotes/' + contactnoteSaveRes.body._id)
							.send(contactnote)
							.expect(200)
							.end(function(contactnoteDeleteErr, contactnoteDeleteRes) {
								// Handle Contactnote error error
								if (contactnoteDeleteErr) done(contactnoteDeleteErr);

								// Set assertions
								(contactnoteDeleteRes.body._id).should.equal(contactnoteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Contactnote instance if not signed in', function(done) {
		// Set Contactnote user 
		contactnote.user = user;

		// Create new Contactnote model instance
		var contactnoteObj = new Contactnote(contactnote);

		// Save the Contactnote
		contactnoteObj.save(function() {
			// Try deleting Contactnote
			request(app).delete('/contactnotes/' + contactnoteObj._id)
			.expect(401)
			.end(function(contactnoteDeleteErr, contactnoteDeleteRes) {
				// Set message assertion
				(contactnoteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Contactnote error error
				done(contactnoteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Contactnote.remove().exec();
		done();
	});
});