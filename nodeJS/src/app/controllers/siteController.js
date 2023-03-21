const Brand = require('../models/products/Brand');

class SiteController {
    home(req, res, next) {
        res.send('home page');
    }

    testAddBrand(req, res, next) {
        const brand = new Brand(req.body);
        brand.save().then(() => {
            res.redirect('http://localhost:3000/');
        });
    }
}

module.exports = new SiteController();
// export default SiteController;
