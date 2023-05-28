const Product = require('../models/products/product');
const Category = require('../models/products/category');
const CategoryDetail = require('../models/products/category_detail');
const { HandleAddImage } = require('../../helpers/multifunction');
class SiteController {
    // GET /category
    GetCategory(req, res, next) {
        Category.find({})
            .exec()
            .then((category) => res.json(category))
            .catch(next);
    }

    // GET /category/:id/category-detail
    ShowCategoryDetail(req, res, next) {
        CategoryDetail.find({ category_id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    // GET /category-detail/:id
    GetCategoryDetail(req, res, next) {
        CategoryDetail.find({ _id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }

    // GET /search
    search(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({ name: { $regex: req.query.name, $options: 'i' } }, { page: page, limit: 16 })
            .then((products) => {
                const data = products.docs.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    products.docs = result;
                    res.json(products);
                });
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
