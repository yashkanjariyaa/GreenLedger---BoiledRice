// models/WasteDisposalRegistration.js

const mongoose = require('mongoose');

// Define schema for Waste Disposal Registration
const WasteDisposalRegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
      },
    selectedPlan: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const WasteDisposalRegistration = mongoose.model('WasteDisposalRegistration', WasteDisposalRegistrationSchema);

module.exports = WasteDisposalRegistration;
