// controllers/userController.js

const User = require("../models/UserRecords");
const moment = require("moment");

// Updating user’s streak (POST)
exports.updateStreak = async (req, res) => {
  try {
    const { username, streak } = req.body;

    // Update the user's streak
    await User.findOneAndUpdate({ username: username }, { streak: streak });

    res.status(200).json({ message: "User streak updated successfully" });
  } catch (error) {
    console.error("Error updating user streak:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieving user’s streak (GET)
exports.getStreak = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's streak
    const user = await User.findOne({ username: username });
    const streak = user.streak;

    res.status(200).json({ streak });
  } catch (error) {
    console.error("Error retrieving user streak:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Providing a badge (POST)
exports.provideBadge = async (req, res) => {
  try {
    const { username, badge } = req.body;

    // Update the user's badges array
    await User.findOneAndUpdate(
      { username: username },
      { $push: { badges: badge } }
    );

    res.status(200).json({ message: "Badge provided successfully" });
  } catch (error) {
    console.error("Error providing badge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieving badge (GET)
exports.getBadges = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's badges array
    const user = await User.findOne({ username: username });
    const badges = user.badges;

    res.status(200).json({ badges });
  } catch (error) {
    console.error("Error retrieving badges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by credits in descending order
    const users = await User.find().sort({ credits: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetching user’s tokens/credits (GET)
exports.getUserCredits = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's credits
    const user = await User.findOne({ username: username });
    const credits = user.credits;

    res.status(200).json({ credits });
  } catch (error) {
    console.error("Error retrieving user credits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCredits = async (req, res) => {
  try {
    const { username, credits } = req.body;

    // Update the user's credits
    await User.findOneAndUpdate({ username: username }, { credits: credits });

    res.status(200).json({ message: "User credits updated successfully" });
  } catch (error) {
    console.error("Error updating user credits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateWeightHistory = async (req, res) => {
    try {
        const { username, weight } = req.body;

        // Get the current date without the time
        const currentDate = new Date().toISOString().split('T')[0]; // Extracting only the date part

        // Find the user
        let user = await User.findOne({ username: username });

        if (!user) {
            // If user not found, create a new one
            user = new User({
                username: username,
                weightHistory: []
            });
        }

        let weightEntryUpdated = false;

        // Check if weight entry for today already exists
        for (let i = 0; i < user.weightHistory.length; i++) {
            // Convert the date strings to Date objects for comparison
            const entryDate = new Date(user.weightHistory[i].date);
            const comparisonDate = new Date(currentDate);

            if (entryDate.getTime() === comparisonDate.getTime()) {
                // If weight entry for today exists, update the weight
                user.weightHistory[i].weight += weight;
                weightEntryUpdated = true;
                break;
            }
        }

        if (!weightEntryUpdated) {
            // If weight entry for today doesn't exist, push a new entry
            user.weightHistory.push({
                date: currentDate,
                weight: weight
            });
        }

        // Save the user object
        await user.save();

        res.status(200).json({ message: 'User weight history updated successfully' });
    } catch (error) {
        console.error('Error updating user weight history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Controller for fetching weight history for a user
exports.getWeightHistory = async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve the user's weight history
    const user = await User.findOne({ username: username });
    const weightHistory = user.weightHistory;

    res.status(200).json({ weightHistory });
  } catch (error) {
    console.error("Error retrieving user weight history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
