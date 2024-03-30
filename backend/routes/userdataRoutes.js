const express = require("express");
const router = express.Router();
const userUpdateController = require('../controllers/userInfo/userUpdateController');
const retrieveUserController = require('../controllers/userInfo/retrieveUpdateController');

router.use(express.json());

router.post('/update', userUpdateController);
router.get('/retrieve', retrieveUserController);

module.exports = router;