const express = require('express');
const productController = require('../app/controllers/productController');
const router = express.Router();

router.get('/discount', productController.Discount);
router.get('/top-selling', productController.TopSelling);
router.get('/new', productController.New);
router.get('/category/:id', productController.Category);
router.get('/category-detail/:id', productController.CategoryDetail);
router.get('/category-detail', productController.ShowCategoryDetail);
router.get('/:id/product-detail', productController.ProductDetail);
router.get('/:id', productController.Product);
router.get('/', productController.ProductShow);

module.exports = router;
