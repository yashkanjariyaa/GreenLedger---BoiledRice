const express = require('express');
const router = express.Router();
const userController = require('../controllers/userInfoController');

router.post('/updateStreak', userController.updateStreak);
router.get('/getStreak/:username', userController.getStreak);
router.post('/provideBadge', userController.provideBadge);
router.get('/getBadges/:username', userController.getBadges);
router.get('/leaderboard', userController.getLeaderboard);
router.get('/getUserCredits/:username', userController.getUserCredits);
router.post('/updateUserCredits', userController.updateCredits);

module.exports = router;
