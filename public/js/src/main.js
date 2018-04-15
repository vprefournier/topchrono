const OrganizationsRouter = require('./routers/OrganizationsRouter');
const OrganizationRouter = require('./routers/OrganizationRouter');

$(document).ready(() => {

	if (window.location.pathname === '/philanthropy') {
		let router = new OrganizationsRouter();
		Backbone.history.start();
	}

	if (window.location.pathname === '/philanthropy/1') {
		let router = new OrganizationRouter();
		Backbone.history.start();
	}


});
