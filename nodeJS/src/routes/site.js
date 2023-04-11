const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();
router.get('/search', siteController.search);
router.get('/sort', siteController.sort);

module.exports = router;
