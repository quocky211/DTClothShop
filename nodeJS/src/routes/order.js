const express = require('express');
const orderController = require('../app/controllers/orderController.js');
const router = express.Router();

router.post('/create', orderController.StoreOrder);
router.get('/momocheckout', orderController.ShowMoMoCheckOut);
router.get('/vnpaycheckout', orderController.ShowVNPayCheckOut);
router.get('/:id/order-detail', orderController.ShowOderDetailByOrder);
router.get('/order-detail/:id', orderController.GetOrderDetail);

module.exports = router;
