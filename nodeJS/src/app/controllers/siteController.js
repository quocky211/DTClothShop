const Product = require('../models/products/product');
const Category = require('../models/products/category');
const CategoryDetail = require('../models/products/category_detail');

class SiteController {
    // GET /category
    GetCategory(req, res, next) {
        Category.find({})
            .exec()
            .then((category) => res.json(category))
            .catch(next);
    }

    // GET /category/:id/category-detail
    GetCategoryDetail(req, res, next) {
        CategoryDetail.find({ category_id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }

    // GET /search
    search(req, res, next) {
        Product.paginate({ name: { $regex: req.query.name, $options: 'i' } }, { page: 1, limit: 16 })
            .then((product) => {
                res.json(product);
            })
            .catch(next);
    }
    sort(req, res, next) {
        Product.find()
            .sort({ _id: -1 })
            .exec()
            .then((product) => res.json(product));
    }
}

module.exports = new SiteController();
