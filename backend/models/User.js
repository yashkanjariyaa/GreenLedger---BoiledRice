// UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    pincode: { type: String },
    registrationDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false } // Added for user verification
});

const User = mongoose.model('User', userSchema);

module.exports = User;
