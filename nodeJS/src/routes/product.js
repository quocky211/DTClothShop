const express = require('express');
const productController = require('../app/controllers/productController');
const router = express.Router();

router.get('/discount', productController.Discount);
router.get('/top-selling', productController.TopSelling);
router.get('/new', productController.New);
router.get('/:id', productController.ProductDetail);

module.exports = router;
