const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.get_signup);
router.get('/login', authController.get_login);
router.post('/signup', authController.post_signup);
router.post('/login', authController.post_login);
router.get('/logout', authController.get_logout);

module.exports = router;