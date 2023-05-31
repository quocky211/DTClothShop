const express = require('express');
const orderController = require('../app/controllers/orderController.js');
const router = express.Router();
const momo = require('../app/controllers/momo.js');

router.post('/create', orderController.StoreOrder);
// router.get('/momocheckout', orderController.ShowMoMoCheckOut);
// router.get('/vnpaycheckout', orderController.ShowVNPayCheckOut);
router.get('/:id/order-detail', orderController.ShowOderDetailByOrder);
router.get('/order-detail/:id', orderController.GetOrderDetail);


router.post('/momo_payment_url', momo.createPaymentUrl);
router.get('/momo_return', momo.verifyPaymentUrl);


module.exports = router;
