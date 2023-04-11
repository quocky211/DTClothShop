const Product = require('../models/products/product');

class SiteController {
    // GET /search
    search(req, res, next) {
        Product.paginate({ name: { $regex: req.query.name, $options: 'i' } }, { page: 1, limit: 5 })
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
