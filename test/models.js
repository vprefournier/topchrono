const {expect} = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const dotenv = require('dotenv');

const User = require('../models/User');
const Organization = require('../models/Organization');
const Project = require('../models/Project');
const mongoose = require('mongoose');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '../.env'});

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27028/test');
mongoose.connection.on('error', (err) => {
	console.error(err);
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	process.exit();
});

describe('User Model', () => {
	it('should create a new user', (done) => {
		const UserMock = sinon.mock(new User({email : 'test@gmail.com', password : 'root'}));
		const user = UserMock.object;

		UserMock
			.expects('save')
			.yields(null);

		user.save((err) => {
			UserMock.verify();
			UserMock.restore();
			expect(err).to.be.null;
			done();
		});
	});

	it('should return error if user is not created', (done) => {
		const UserMock = sinon.mock(new User({email : 'test@gmail.com', password : 'root'}));
		const user = UserMock.object;
		const expectedError = {
			name : 'ValidationError'
		};

		UserMock
			.expects('save')
			.yields(expectedError);

		user.save((err, result) => {
			UserMock.verify();
			UserMock.restore();
			expect(err.name).to.equal('ValidationError');
			expect(result).to.be.undefined;
			done();
		});
	});

	it('should not create a user with the unique email', (done) => {
		const UserMock = sinon.mock(User({email : 'test@gmail.com', password : 'root'}));
		const user = UserMock.object;
		const expectedError = {
			name : 'MongoError',
			code : 11000
		};

		UserMock
			.expects('save')
			.yields(expectedError);

		user.save((err, result) => {
			UserMock.verify();
			UserMock.restore();
			expect(err.name).to.equal('MongoError');
			expect(err.code).to.equal(11000);
			expect(result).to.be.undefined;
			done();
		});
	});

	it('should find user by email', (done) => {
		const userMock = sinon.mock(User);
		const expectedUser = {
			_id : '5700a128bd97c1341d8fb365',
			email : 'test@gmail.com'
		};

		userMock
			.expects('findOne')
			.withArgs({email : 'test@gmail.com'})
			.yields(null, expectedUser);

		User.findOne({email : 'test@gmail.com'}, (err, result) => {
			userMock.verify();
			userMock.restore();
			expect(result.email).to.equal('test@gmail.com');
			done();
		});
	});

	it('should remove user by email', (done) => {
		const userMock = sinon.mock(User);
		const expectedResult = {
			nRemoved : 1
		};

		userMock
			.expects('remove')
			.withArgs({email : 'test@gmail.com'})
			.yields(null, expectedResult);

		User.remove({email : 'test@gmail.com'}, (err, result) => {
			userMock.verify();
			userMock.restore();
			expect(err).to.be.null;
			expect(result.nRemoved).to.equal(1);
			done();
		});
	});
});

describe.only('New Organization and projet', function() {
	this.timeout(100000);
	it('Create Fondation du CHUS', function(done) {
		let organization = new Organization({
			id : 1,
			name : 'Fondation du CHUS',
			logo : 'https://www.jedonneenligne.org/fondationchus/view.php?file_id=logo_Logoofficiel.jpg',
			description : 'Notre mission est de contribuer à l’excellence des soins et des services prodigués à l’Hôpital Fleurimont et à l’Hôtel-Dieu de Sherbrooke, principalement par l’acquisition d’équipements médicaux  et en soutenant la recherche médicale.'
		});
		organization.save((err) => {

			done(err);
		});
	});
});
