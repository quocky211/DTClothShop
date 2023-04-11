const express = require('express');
const adminController = require('../app/controllers/adminController');
const router = express.Router();

router.get('/product', adminController.ShowProduct);
router.post('/product/store', adminController.StoreProduct);
router.put('/product/:id', adminController.UpdateProduct);
router.delete('/product/:id', adminController.DestroyProduct);

module.exports = router;
