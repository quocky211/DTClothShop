const express = require('express');
const blogController = require('../app/controllers/blogController.js');
const router = express.Router();

router.get('/blog-detail/:id', blogController.ShowBlogDetail);
router.get('/', blogController.ShowBlogs);



module.exports = router;