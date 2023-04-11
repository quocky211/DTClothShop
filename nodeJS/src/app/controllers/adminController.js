const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const CategoryDetail = require('../models/products/category_detail');
const { multipleMongooseToObject } = require('../../util/mongoose');

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({}, { page: page, limit: 5 })
            .then((product) => {
                res.json(product);
            })
            .catch((err) => next(err));
    }

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

        const product = new Product(formDataPro);
        product
            .save()
            .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));

        // const producDetail = new ProductDetail(formDataProDetail);
        // product.save.then(() => {
        //     producDetail.save.then(() => res.send('thêm thành công'));
        // });

        // Product.find({}, 'name')
        //     .populate('brand_id')
        //     .exec()
        //     .then((pro) => res.send(pro));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .exec()
            // .then(() => res.redirect('/me/stored/courses'))
            .then(() => res.send('Update sản phẩm thành công'))
            .catch((product) => next(product));
    }

    // delete /admin/product/:id
    DestroyProduct(req, res, next) {
        Course.delete({ _id: req.params.id })
            .exec()
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdminController();
// export default SiteController;
