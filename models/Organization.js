const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  id : Number,
  title : String,
  description : String,
  image : String,
  amount : String,
  numDonors : Number,
  moneySoFar : String,
  category : String,
  percentage : Number
}, {timestamps : true});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
