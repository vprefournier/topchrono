const Backbone = require('Backbone');

class OrganizationModel extends Backbone.Model {

	get idAttribute() {
		return "id";
	}

	get urlRoot() {
		return "/api/organizations";
	}

	constructor(options) {
		super(options);
	}
}

module.exports = OrganizationModel;