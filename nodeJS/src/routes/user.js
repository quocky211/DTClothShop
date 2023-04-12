const express = require('express');
const userController = require('../app/controllers/userController');
const router = express.Router();

router.post('/register', userController.Register);
router.post('/refresh-token', userController.RefreshToken);
router.post('/login', userController.Login);
router.post('/logout', userController.Logout);

module.exports = router;
