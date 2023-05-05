const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();
router.get('/search', siteController.search);
router.get('/category-detail/:id', siteController.GetCategoryDetail);
router.get('/sort', siteController.sort);
router.get('/category/:id/category-detail', siteController.ShowCategoryDetail);
router.get('/category', siteController.GetCategory);

module.exports = router;
