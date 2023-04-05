const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');

class AdminController {
    // POST /admin/product/store
    StoreProduct(req, res, next) {
        const formDataPro = {
            category_id: req.body.category_id,
            category_detail_id: req.body.category_detail_id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            weight: req.body.weight,
            material: req.body.material,
            featured: req.body.featured,
        };

        const formDataProDetail = {
            product_id: req.body.product_id,
            color: req.body.color,
            size: req.body.size,
            qty: req.body.qty,
        };
        const product = new Product(formDataPro);
        const producDetail = new ProductDetail(formDataProDetail);
        product.save.then(() => {
            producDetail.save.then(() => res.send('thêm thành công'));
        });

        // Product.find({}, 'name')
        //     .populate('brand_id')
        //     .exec()
        //     .then((pro) => res.send(pro));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .exec()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((course) => next(course));
    }
}

module.exports = new AdminController();
// export default SiteController;
