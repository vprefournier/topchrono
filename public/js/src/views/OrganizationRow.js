const Backbone = require('Backbone');

class OrganizationRow extends Backbone.View {
	constructor(options) {
		super(options);
    this.rowTemplate = options.rowTemplate;

	}

	render() {
    this.undelegateEvents();
    // set this.el to the domElement from the templates
    this.el = this.rowTemplate(this.model.attributes);

    // re-delegate the events (re-bind 'click' dom events to buttons).
    this.delegateEvents();

    return this;
	}
}

module.exports = OrganizationRow;