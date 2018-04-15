const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
	id : Number,
	name : String,
	logo : String,
	description : String
}, {timestamps : true});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
