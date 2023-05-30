const express = require('express');
const adminController = require('../app/controllers/adminController');
const router = express.Router();
const uploadCloud = require( '../helpers/uploader.js');
// product
router.get('/product', adminController.ShowProduct);
router.get('/product/:id/product-detail', adminController.ShowProductDetail);
router.post('/product/store', adminController.StoreProduct);
router.post('/product-detail/store',uploadCloud.single('path'), adminController.StoreProductDetail);
router.put('/product/edit/:id', adminController.UpdateProduct);
router.delete('/product/delete/:id', adminController.DestroyProduct);

// user
router.get('/user/show', adminController.ShowUser);
router.post('/user/store', adminController.StoreUser);
router.put('/user/edit/:id', adminController.EditUser);
router.delete('/user/delete/:id', adminController.DestroyUser);

// order /order/:id/order-detail
router.get('/order/show', adminController.ShowOrder);
router.get('/order/:id/order-detail', adminController.ShowOrderDetail);

module.exports = router;
