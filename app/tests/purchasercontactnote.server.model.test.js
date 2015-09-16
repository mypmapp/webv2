'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Purchasercontactnote = mongoose.model('Purchasercontactnote');

/**
 * Globals
 */
var user, purchasercontactnote;

/**
 * Unit tests
 */
describe('Purchasercontactnote Model Unit Tests:', function() {
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
			purchasercontactnote = new Purchasercontactnote({
				name: 'Purchasercontactnote Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return purchasercontactnote.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			purchasercontactnote.name = '';

			return purchasercontactnote.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Purchasercontactnote.remove().exec();
		User.remove().exec();

		done();
	});
});