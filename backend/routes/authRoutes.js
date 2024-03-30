const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(express.json()); // Parsing JSON requests

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
