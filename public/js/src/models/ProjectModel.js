const Backbone = require('Backbone');

class ProjectModel extends Backbone.Model {

	get idAttribute() {
		return "id";
	}

	get urlRoot() {
		return "/api/projects";
	}

	constructor(options) {
		super(options);
	}
}

module.exports = ProjectModel;