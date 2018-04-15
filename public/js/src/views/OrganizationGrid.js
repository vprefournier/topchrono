const Backbone = require('Backbone')
const OrganizationRow = require('./OrganizationRow')
const _ = require('underscore');

class OrganizationGrid extends Backbone.View {
  constructor (options) {
    super(options);

    // Find and initialize the row template.
    let rowTplString = '<div>BONJOUR<%- name %></div>';
    this._rowTpl = _.template(rowTplString);

    this.listenTo(this.collection, 'sync', this.render);
  }

  render () {
    console.log('render mon grid')
    let container = document.createDocumentFragment();
    this.collection.forEach((model) => {
      console.log('je rentre une fois, je rentre deux fois?');
      let row = new OrganizationRow({model : model, rowTemplate : this._rowTpl});
      row.render();
      this.$el.append(row.el);
    });
  }
}

module.exports = OrganizationGrid