const Backbone = require('Backbone');
const OrganizationModel = require('../models/OrganizationModel');

class OrganizationCollection extends Backbone.Collection {

	get model() {
		return OrganizationModel;
	}

	constructor(options) {
		super(options);
	}
}

module.exports = OrganizationCollection;