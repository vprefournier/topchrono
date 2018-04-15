const {expect} = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const dotenv = require('dotenv');

const async = require('async');
const User = require('../models/User');
const Organization = require('../models/Organization');
const mongoose = require('mongoose');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '../.env'});

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:BishopsCS@ds125555.mlab.com:25555/demo');
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
		let organizations = [];

		organizations.push(new Organization({
      id : 1,
      title : "Soins  Mère - Enfant",
      description : "Ce nouveau pavillon adjacent au CHUS – Hôpital Fleurimont rassemblera sous un même toit les services et soins offerts aux 0-18 ans en santé physique, santé mentale et soins dédiés à la périnatalité. Il rehaussera la qualité de l’environnement hospitalier et consolidera l’approche en soins, centrée sur le patient et sa famille.",
      image : "https://images.radio-canada.ca/q_auto,w_960/v1/ici-info/16x9/pavillon-enfant-soleil-sherbrooke.jpg",
      amount : "100 000$",
      numDonors : 875,
      moneySoFar : "9 003$",
      category : "Développement de soins",
      percentage : 0.09
    }));

    organizations.push(new Organization({
      id : 2,
      title : "Imagerie Médicale",
      description : "Les chercheurs de l’axe travaillent aussi à la synthèse de nouveaux radiotraceurs, d’agents de contraste et de radiosensibilisateurs, de même qu’au développement d’essais précliniques et cliniques visant à valider ces substances issues de la recherche, avant leur commercialisation.",
      image : "http://cr.chus.qc.ca/uploads/pics/CRCELB_CHUS_maquette_Low.jpg",
      amount : "174 000$",
      numDonors : 234,
      moneySoFar : "13 000$",
      category : "Développement de soins",
      percentage : 0.07
    }));

    organizations.push(new Organization({
      id : 3,
      title : "Laboratoire",
      description : "Les laboratoires de Biologie médicale du CIUSSS de l'Estrie-CHUS fournissent un service complet d'analyses diagnostiques de routine, spécialisées et ultraspécialisées en biochimie, hématologie, microbiologie, pathologie, immunologie et en génétique médicale.",
      image : "http://www.chus.qc.ca/typo3temp/pics/47b81c9480.jpg",
      amount : "600 000$",
      numDonors : 334,
      moneySoFar : "30 400$",
      category : "Développement de soins",
      percentage : 0.05
    }));

    organizations.push(new Organization({
      id : 4,
      title : "Médecine générale et urgence",
      description : "Médecine générale et urgence",
	    image : "http://www.chus.qc.ca/fileadmin/doc_chus/Le_CHUS/Grands_projets/Mise_%C3%A0_jour_sept2012/chirurgie.JPG",
      amount : "1 000 000$",
      numDonors : 4848,
      moneySoFar : "789 000$",
      category : "Développement de soins",
      percentage : 0.78
    }));

    organizations.push(new Organization({
      id : 5,
      title : "Recherche (sur le santé)",
      description : "Le Centre de recherche du Centre hospitalier universitaire de Sherbrooke (CRCHUS) favorise l’excellence de ses chercheurs en partant de ses forces et de son milieu. Il offre un environnement collaboratif propice à la créativité et aux partenariats.",
      image : "http://cr.chus.qc.ca/uploads/pics/CRCELB-CHUS_modif_01.jpg",
      amount : "100 300$",
      numDonors : 102,
      moneySoFar : "956$",
      category : "Développement de soins",
      percentage : 0.01
    }));

    organizations.push(new Organization({
      id : 6,
      title : "Soins cardio pulmonaires",
      description : "",
      image : "http://www.chus.qc.ca/typo3conf/ext/chus_carte_interactive/carte_interactive/admin/incoming/20130716145746_porte_60_test2.gif",
      amount : "1 000 000$",
      numDonors : 8974,
      moneySoFar : "75 600$",
      category : "Développement de soins",
      percentage : 0.01
    }));

    organizations.push(new Organization({
      id : 7,
      title : "Soins critiques et traumatologie",
      description : "Revoir rapidement les patients post-trauma nécessitant une consultation en orthopédie et diminuer l’achalandage de la salle d’urgence.",
      image : "http://www.chus.qc.ca/fileadmin/doc_chus/Le_CHUS/Grands_projets/Mise_%C3%A0_jour_sept2012/CHUS_HF.jpg",
      amount : "500 000$",
      numDonors : 2985,
      moneySoFar : "398 000$",
      category : "Développement de soins",
      percentage : 0.8
    }));

    organizations.push(new Organization({
      id : 8,
      title : "Santé mentale",
      description : "Le Programme en santé mentale du CHUS offre différents soins spécialisés de santé mentale à la population de l'Estrie : Centre d'expertise; Approches intensives; Troubles affectifs; Troubles psychotiques; Centre de rétablissement intensif; Psychiatrie légale.",
      image : "https://www.santeestrie.qc.ca/uploads/pics/Livre_AP.jpg",
      amount : "1 000 000$",
      numDonors : 1023,
      moneySoFar : "249 003$",
      category : "Développement de soins",
      percentage : 0.25
    }));

    organizations.push(new Organization({
      id : 9,
      title : "Soins Oncologiques",
      description : "Évaluation et prise en charge des patients avec cancers.",
      image : "http://www.chus.qc.ca/fileadmin/doc_chus/Centre_des_medias/Communiques_2013/CHUS_Com_prix_direction_cancerologie_photos_01.jpg",
      amount : "400 000$",
      numDonors : 958,
      moneySoFar : "33 000$",
      category : "Développement de soins",
      percentage : 0.08
    }));

    async.each(organizations, (organization, eachCb) => {
      organization.save(eachCb);
    }, done);

	});
});
