'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Purchaser = mongoose.model('Purchaser'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, purchaser;

/**
 * Purchaser routes tests
 */
describe('Purchaser CRUD tests', function() {
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

		// Save a user to the test db and create new Purchaser
		user.save(function() {
			purchaser = {
				name: 'Purchaser Name'
			};

			done();
		});
	});

	it('should be able to save Purchaser instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchaser
				agent.post('/purchasers')
					.send(purchaser)
					.expect(200)
					.end(function(purchaserSaveErr, purchaserSaveRes) {
						// Handle Purchaser save error
						if (purchaserSaveErr) done(purchaserSaveErr);

						// Get a list of Purchasers
						agent.get('/purchasers')
							.end(function(purchasersGetErr, purchasersGetRes) {
								// Handle Purchaser save error
								if (purchasersGetErr) done(purchasersGetErr);

								// Get Purchasers list
								var purchasers = purchasersGetRes.body;

								// Set assertions
								(purchasers[0].user._id).should.equal(userId);
								(purchasers[0].name).should.match('Purchaser Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Purchaser instance if not logged in', function(done) {
		agent.post('/purchasers')
			.send(purchaser)
			.expect(401)
			.end(function(purchaserSaveErr, purchaserSaveRes) {
				// Call the assertion callback
				done(purchaserSaveErr);
			});
	});

	it('should not be able to save Purchaser instance if no name is provided', function(done) {
		// Invalidate name field
		purchaser.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchaser
				agent.post('/purchasers')
					.send(purchaser)
					.expect(400)
					.end(function(purchaserSaveErr, purchaserSaveRes) {
						// Set message assertion
						(purchaserSaveRes.body.message).should.match('Please fill Purchaser name');
						
						// Handle Purchaser save error
						done(purchaserSaveErr);
					});
			});
	});

	it('should be able to update Purchaser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchaser
				agent.post('/purchasers')
					.send(purchaser)
					.expect(200)
					.end(function(purchaserSaveErr, purchaserSaveRes) {
						// Handle Purchaser save error
						if (purchaserSaveErr) done(purchaserSaveErr);

						// Update Purchaser name
						purchaser.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Purchaser
						agent.put('/purchasers/' + purchaserSaveRes.body._id)
							.send(purchaser)
							.expect(200)
							.end(function(purchaserUpdateErr, purchaserUpdateRes) {
								// Handle Purchaser update error
								if (purchaserUpdateErr) done(purchaserUpdateErr);

								// Set assertions
								(purchaserUpdateRes.body._id).should.equal(purchaserSaveRes.body._id);
								(purchaserUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Purchasers if not signed in', function(done) {
		// Create new Purchaser model instance
		var purchaserObj = new Purchaser(purchaser);

		// Save the Purchaser
		purchaserObj.save(function() {
			// Request Purchasers
			request(app).get('/purchasers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Purchaser if not signed in', function(done) {
		// Create new Purchaser model instance
		var purchaserObj = new Purchaser(purchaser);

		// Save the Purchaser
		purchaserObj.save(function() {
			request(app).get('/purchasers/' + purchaserObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', purchaser.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Purchaser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Purchaser
				agent.post('/purchasers')
					.send(purchaser)
					.expect(200)
					.end(function(purchaserSaveErr, purchaserSaveRes) {
						// Handle Purchaser save error
						if (purchaserSaveErr) done(purchaserSaveErr);

						// Delete existing Purchaser
						agent.delete('/purchasers/' + purchaserSaveRes.body._id)
							.send(purchaser)
							.expect(200)
							.end(function(purchaserDeleteErr, purchaserDeleteRes) {
								// Handle Purchaser error error
								if (purchaserDeleteErr) done(purchaserDeleteErr);

								// Set assertions
								(purchaserDeleteRes.body._id).should.equal(purchaserSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Purchaser instance if not signed in', function(done) {
		// Set Purchaser user 
		purchaser.user = user;

		// Create new Purchaser model instance
		var purchaserObj = new Purchaser(purchaser);

		// Save the Purchaser
		purchaserObj.save(function() {
			// Try deleting Purchaser
			request(app).delete('/purchasers/' + purchaserObj._id)
			.expect(401)
			.end(function(purchaserDeleteErr, purchaserDeleteRes) {
				// Set message assertion
				(purchaserDeleteRes.body.message).should.match('User is not logged in');

				// Handle Purchaser error error
				done(purchaserDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Purchaser.remove().exec();
		done();
	});
});