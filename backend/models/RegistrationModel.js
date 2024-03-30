// RegistrationModel.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add fields related to registration
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    // Add other fields as needed
    confirmed: { type: Boolean, default: false } // Added for confirmation status
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
