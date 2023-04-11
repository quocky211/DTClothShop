const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const CategoryDetail = require('../models/products/category_detail');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {
    // GET /product/discount
    Discount(req, res, next) {
        Product.find({ discount: { $ne: 0, $ne: null } })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }

    // GET /product/top-selling
    TopSelling(req, res, next) {
        Product.aggregate([{ $sample: { size: 10 } }])
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }

    // GET /product/new
    New(req, res, next) {
        Product.find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .exec()
            .then((product) => res.json(product));
    }

    // GET /product/:id
    ProductDetail(req, res, next) {
        Product.find({ _id: req.params.id })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }
}

module.exports = new ProductController();
// export default SiteController;
