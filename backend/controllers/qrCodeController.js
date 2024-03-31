const QrCode = require('../models/qrcode');
const User = require('../models/User');
const UserRecords = require('../models/UserRecords');
const WasteDisposalRegistration = require('../models/WasteDisposalRegistration');

// Controller function to create a new QR code
exports.createQrCode = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Fetch user details by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch user records to calculate total days
    const userRecords = await UserRecords.findOne({ username: user.username });
    
    // If user records not found, return error
    if (!userRecords) {
      return res.status(404).json({ error: 'User records not found' });
    }

    // Calculate total days from user records
    const totalDays = userRecords.weightHistory.length; // Modify this according to your schema structure

    // Check if the QR code already exists for this user
    const existingQrCode = await QrCode.findOne({ username: user.username });
    if (existingQrCode) {
      return res.status(400).json({ error: 'QR code already exists for this user' });
    }

    // Create a new QR code
    const newQrCode = new QrCode({
      username: user.username,
      totalDays: totalDays,
      dailyPlan: user.dailyPlan, // Assuming this field exists in User schema
      tokenId: user._id       // Use user's _id as token ID
    });

    // Save the QR code to the database
    // await newQrCode.save();

    // Generate URL
    const url = `http://localhost:3000/api/user/update?username=${user.username}&totalDays=${totalDays}&tokenId=${user._id}&currentDate=${Date.now()}`;
    console.log(url)

    // Return success response along with the generated URL
    res.status(201).json({ url });
  } catch (error) {
    // Handle errors
    console.error('Error creating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
