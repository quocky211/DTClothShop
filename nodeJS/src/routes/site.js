const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();
router.get('/search', siteController.search);
router.get('/sort', siteController.sort);
router.get('/category/:id/category-detail', siteController.GetCategoryDetail);
router.get('/category', siteController.GetCategory);

module.exports = router;
