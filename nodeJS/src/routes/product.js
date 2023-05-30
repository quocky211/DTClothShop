const express = require('express');
const productController = require('../app/controllers/productController');
const router = express.Router();

router.get('/discount', productController.Discount);
router.get('/top-selling', productController.TopSelling);
router.get('/new', productController.New);
router.get('/category/:id', productController.Category);
router.get('/category-detail/:id', productController.CategoryDetail);
router.get('/category-detail', productController.ShowCategoryDetail);
router.get('/outfit', productController.ShowOutfit);
router.get('/outfit/:id', productController.GetOutfit);
router.get('/outfit/:id/outfit-detail', productController.ShowOutfitDetail);
router.get('/:id/product-detail', productController.ProductDetail);
router.get('/:id/comment', productController.ShowComment);
router.get('/:id/count-and-starrating-comment', productController.CountComment);

router.get('/:id', productController.GetProduct);
router.get('/', productController.ProductShow);

module.exports = router;
