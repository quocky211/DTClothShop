const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const User = require('../models/user/user');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');

// const ProductDetail = require('../models/products/product_detail');
// const CategoryDetail = require('../models/products/category_detail');
const { multipleMongooseToObject } = require('../../util/mongoose');

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({}, { page: page, limit: 10 })
            .then((product) => {
                res.json(product);
            })
            .catch((err) => next(err));
    }

    // GET /admin/product/:id/product-detail
    ShowProductDetail(req, res, next) {
        ProductDetail.find({ product_id: req.params.id })
            .exec()
            .then((productDetail) => res.json(productDetail))
            .catch(next);
    }

    // POST /admin/product/store
    StoreProduct(req, res, next) {
        // const formDataPro = {
        //     category_id: req.body.category_id,
        //     category_detail_id: req.body.category_detail_id,
        //     name: req.body.name,
        //     description: req.body.description,
        //     price: req.body.price,
        //     discount: req.body.discount,
        //     weight: req.body.weight,
        //     material: req.body.material,
        //     featured: req.body.featured,
        // };

        // const product = new Product(req.body);
        // product
        //     .save()
        //     .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNGGGG'))
        //     .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));

        Product.create(req.body)
            .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNGGGG'))
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

    StoreProductDetail(req, res, next) {
        const productDetail = new ProductDetail(req.body);
        productDetail
            .save()
            .then(() => res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .exec()
            // .then(() => res.redirect('/me/stored/courses'))
            .then(() => res.send('Update sản phẩm thành công'))
            .catch((product) => next(product));
    }

    // delete /admin/product/delete/:id
    DestroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .exec()
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // GET /admin/user/show
    ShowUser(req, res, next) {
        const page = req.query.page || 1;
        User.paginate({ level: false }, { page: page, limit: 10 })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => next(err));
    }

    // POST /admin/user/store
    StoreUser(req, res, next) {}

    // PUT /admin/user/edit/:id
    EditUser(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .exec()
            .then(() => res.send('Update người dùng thành công'))
            .catch(() => res.send('Update người dùng thất bại'));
    }

    // DELETE /admin/user/delete/:id
    DestroyUser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .exec()
            .then(() => res.send('Xóa người dùng thành công!!'))
            .catch(() => res.send('Xóa người dùng thất bại!!'));
    }

    ShowOrder(req, res, next) {
        const page = req.query.page || 1;
        Order.paginate({}, { page: page, limit: 10 })
            .then((order) => {
                res.json(order);
            })
            .catch((err) => next(err));
    }

    ShowOrderDetail(req, res, next) {
        OrderDetail.find({ order_id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
}

module.exports = new AdminController();

// export default SiteController;
