const express = require('express');
const adminController = require('../app/controllers/adminController');
const { route } = require('./site');
const router = express.Router();

router.post('/product/store', adminController.StoreProduct);

module.exports = router;
