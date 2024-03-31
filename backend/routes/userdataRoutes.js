const express = require("express");
const router = express.Router();
const userUpdateController = require('../controllers/userDataContractController/userUpdateController');
const retrieveUserController = require('../controllers/userDataContractController/retrieveUpdateController');
const registerPlan = require("../controllers/registerPlan/registerForPlan");

router.use(express.json());

router.post('/update', userUpdateController);
router.get('/retrieve/tokenId:', retrieveUserController);
router.post('/register', registerPlan);
module.exports = router;