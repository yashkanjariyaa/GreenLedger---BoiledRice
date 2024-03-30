const mongoose = require('mongoose');

const userRecordsSchema = new mongoose.Schema({
    username: { type: String, required: true, ref:'User' },
    streak: { type: Number, default: 0 },
    badges:{ badgeName: String },
    points: { type: Number, default: 0 },
    credits: { type: Number, default: 0 }
});

const UserRecords = mongoose.model('UserRecords', userRecordsSchema);

module.exports = UserRecords;
