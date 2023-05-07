const httpError = require('http-errors');

const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const ProductImage = require('../models/products/product_image');
const User = require('../models/user/user');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const { userValidate } = require('../../helpers/validation');

// const ProductDetail = require('../models/products/product_detail');
// const CategoryDetail = require('../models/products/category_detail');

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        Product.find({})
            .populate({ path: 'category_detail_id', select: 'name' })
            .exec()
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
        const product = new Product(req.body);
        product
            .save()
            .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // POST /admin/product-detail/store
    StoreProductDetail(req, res, next) {
        const productDetail = new ProductDetail(req.body);
        productDetail
            .save()
            .then(() => res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // POST /admin/product-image/store
    StoreProductImage(req, res, next) {
        const product_id = req.body.product_id;
        const path = req.body.image;
        const length = path.length;
        var data = [];
        for (var i = 0; i < length; i++) {
            var ob = {
                product_id,
                path: path[i],
            };
            data.push(ob);
        }

        ProductImage.insertMany(data)
            .then(() => res.send('Thêm hình ảnh sản phẩm thành công'))
            .catch(() => res.send('Thêm thất bại'));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .exec()
            .then(() => res.send('Update sản phẩm thành công'))
            .catch(() => res.send('Update sản phẩm thất bại'));
    }

    // delete /admin/product/delete/:id
    DestroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .exec()
            .then(() => res.send('Xóa sản phẩm thành công'))
            .catch(() => res.send('Xóa sản phẩm thất bại'));
    }

    // GET /admin/user/show
    ShowUser(req, res, next) {
        User.find({ level: false })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => next(err));
    }

    // POST /admin/user/store
    async StoreUser(req, res, next) {
        try {
            const { email } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }
            const isExistEmail = await User.findOne({ email: email });

            if (isExistEmail) throw httpError.Conflict(`${email} đã được đăng ký!!`);

            const formData = {
                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                birthday: req.body.birthday,
                address: req.body.address,
                name: req.body.name,
                phone: req.body.phone,
                avatar: req.body.avatar,
                level: req.body.level,
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    res.send('Thêm người dùng thành công');
                })
                .catch(() => res.send('Thêm người dùng thất bại'));
        } catch (error) {
            next(error);
        }
    }

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
        Order.find()
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
