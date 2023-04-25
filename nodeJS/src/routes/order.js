const express = require('express');
const orderController = require('../app/controllers/orderController.js');
const router = express.Router();

router.post('/create', orderController.StoreOrder);
router.get('/momocheckout', orderController.ShowMoMoCheckOut);
module.exports = router;