'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Vendorcontactnote = mongoose.model('Vendorcontactnote');

/**
 * Globals
 */
var user, vendorcontactnote;

/**
 * Unit tests
 */
describe('Vendorcontactnote Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			vendorcontactnote = new Vendorcontactnote({
				name: 'Vendorcontactnote Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return vendorcontactnote.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			vendorcontactnote.name = '';

			return vendorcontactnote.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Vendorcontactnote.remove().exec();
		User.remove().exec();

		done();
	});
});