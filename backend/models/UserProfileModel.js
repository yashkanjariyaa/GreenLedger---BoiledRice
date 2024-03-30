// UserProfileModel.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add fields specific to user profile retrieval
    // You can customize this based on what information you want to provide in the user profile retrieval
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
