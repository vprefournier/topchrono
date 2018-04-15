const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	id : Number,
	organizationId : Number,
	title : String,
	description : String,
	image : String,
	amount : Number,
	numDonors : Number,
	users : [String],
	duDate : Date,
	moneySoFar : Number,
	category : String
}, {timestamps : true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
