// controllers/wasteDisposalController.js

const User = require('../models/User');
const UserRecords = require('../models/UserRecords');
const userRecords = require('../models/UserRecords')
const Waste = require('../models/waste');
const saveUsernameAndPlan = async (req, res) => {
  const { email, dailyPlan } = req.body;

  try {
    // Find the user by email ID
    const user = await User.findOne({ email });
    const username = user.username;
    console.log(user);
    console.log(username);
    const userRecords = await UserRecords.findOne({ username })
    console.log(userRecords);
    const totalDays = userRecords.totalDays;
    // const dailyPlan = await Waste.findOne({ username }).dailyPlan;
    // console.log(totalDays, dailyPlan)

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the selected plan from the user record
    const selectedPlan = user.selectedPlan;

    res.status(200).json({ message: 'Username and selected plan saved successfully' });
  } catch (error) {
    console.error('Error saving username and plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  saveUsernameAndPlan
};
