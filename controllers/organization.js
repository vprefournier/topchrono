const Organization = require('../models/Organization')

class OrganizationController {
  static getOrganizations (req, res, next) {
    Organization.find({}, (err, organizations) => {
      res.json(organizations)
    })
  }
}

module.exports = OrganizationController