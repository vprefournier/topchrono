const Backbone = require('Backbone')
const $ = require('jquery')
const ProjectGrid = require('../views/ProjectGrid')
const ProfileModel = require('../models/OrganizationModel')

class OrganizationRouter extends Backbone.Router {

  get routes () {
    return {
      '': 'init'
    }
  }

  constructor (options) {
    super(options)
    this.model = new OrganizationModel()
    this.page = new ProjectGrid({
      el: $('body'),
      model: this.model
    })
  }

  init () {
    this.model.set({id: 1})
    this.model.fetch()
  }
}

module.exports = OrganizationRouter