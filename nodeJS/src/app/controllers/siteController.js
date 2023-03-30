const Brand = require('../models/products/brand');
const Product = require('../models/products/product');

class SiteController {
    home(req, res, next) {
        // res.send('home page');
        Product.find({}, 'name')
            .populate('brand_id')
            .exec()
            .then((pro) => res.send(pro));
    }

    testAddBrand(req, res, next) {
        const brand = new Brand(req.body);
        brand.save().then(() => {
            res.send('Thêm thành công');
        });
    }
}

module.exports = new SiteController();
// export default SiteController;
