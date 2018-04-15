const Backbone = require('Backbone')
const $ = require('jquery')
const OrganizationGrid = require('../views/OrganizationGrid')
const OrganizationCollection = require('../collections/OrganizationCollection')

class OrganizationsRouter extends Backbone.Router {

  get routes () {
    return {
      '': 'init'
    }
  }

  constructor (options) {
    super(options)
    this.collection = new OrganizationCollection()
    this.organizationGrid = new OrganizationGrid({
      el: $('body div.projects-container'),
      collection: this.collection
    })
  }

  init () {
    console.log('doing my fetch');
    this.collection.fetch({url: 'api/organizations'});
  }
}

module.exports = OrganizationsRouter