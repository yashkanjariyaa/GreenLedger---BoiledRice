// controllers/wasteDisposalController.js

const User = require('../models/User');
const userRecords = require('../models/UserRecords')
const waste = require('../models/waste')
const WasteDisposalRegistration = require('../models/WasteDisposalRegistration');

// Controller function to save the username and selected plan for a given email ID
const saveUsernameAndPlan = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email ID
    const user = await User.findOne({ email });
    const username = user.username;
    const selectedPlan = await User.findOne({ username });

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save the username and selected plan associated with the user
    const registrationData = {
      selectedPlan,
      username,
    };

    // Create a new instance of WasteDisposalRegistration model
    const newRegistration = new WasteDisposalRegistration(registrationData);

    // Save the new registration to the database
    await newRegistration.save();

    // Send success response
    res.status(200).json({ message: 'Username and selected plan saved successfully' });
  } catch (error) {
    console.error('Error saving username and plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  saveUsernameAndPlan
};
