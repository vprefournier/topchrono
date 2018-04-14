const mongoose = require('mongoose');
const User = require('./User');
const donationSchema = new mongoose.Schema({
	user : User,
	id : String,
	frequency: Number,
	charityId : String,
	charityProjectId : String,
	amount : Number,
}, {timestamps : true});


const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
