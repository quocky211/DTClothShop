const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();

router.get('/', siteController.home);

module.exports = router;
