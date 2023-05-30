const httpError = require('http-errors');

const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const User = require('../models/user/user');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const { userValidate } = require('../../helpers/validation');
const { TestGetListUser } = require('./userController');
const client = require('../../helpers/connection_redis');

// const ProductDetail = require('../models/products/product_detail');
// const CategoryDetail = require('../models/products/category_detail');

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        Product.find({})
            .populate({ path: 'category_detail_id', select: 'name' })
            .exec()
            .then((products) => {
                const data = products.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            });
        function HandleAddImage(product) {
            return ProductDetail.find({ product_id: product._id })
                .exec()
                .then((productDetails) => {
                    return {
                        product,
                        path: productDetails[0].path,
                    };
                });
        }
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
        const cacheKey = 'newProducts';

        // Clear the cached data for the updated product
        client.del(cacheKey, (err, numRemoved) => {
            if (err) {
                console.error('Redis cache error:', err);
            }
            console.log(`Cleared cache for ${numRemoved} key(s)`);

            // Proceed with updating the product
            const product = new Product(req.body);
            product
                .save()
                .then(() => {
                    res.send('THÊM SẢN PHẨM THÀNH CÔNG');
                })
                .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
        });
    }

    // POST /admin/product-detail/store
    StoreProductDetail(req, res, next) {
        const productDetail = new ProductDetail(req.body);
        productDetail
            .save()
            .then(() => res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        const productId = req.params.id;
        const cacheKey = `product:${productId}`;

        // Clear the cached data for the updated product
        client.del(cacheKey, (err, numRemoved) => {
            if (err) {
                console.error('Redis cache error:', err);
            }
            console.log(`Cleared cache for ${numRemoved} key(s)`);

            // Proceed with updating the product
            Product.updateOne({ _id: productId }, req.body)
                .exec()
                .then(() => res.send('Update sản phẩm thành công'))
                .catch(() => res.send('Update sản phẩm thất bại'));
        });
    }

    // delete /admin/product/delete/:id
    DestroyProduct(req, res, next) {
        const productId = req.params.id;
        const cacheKey = `product:${productId}`;

        // Clear the cached data for the updated product
        client.del(cacheKey, (err, numRemoved) => {
            if (err) {
                console.error('Redis cache error:', err);
            }
            console.log(`Cleared cache for ${numRemoved} key(s)`);

            // Proceed with updating the product
            Product.deleteOne({ _id: productId })
                .exec()
                .then(() => res.send('Xóa sản phẩm thành công'))
                .catch(() => res.send('Xóa sản phẩm thất bại'));
        });
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
        const userId = req.params.id;
        const cacheKey = `user:${userId}`;
        client.del(cacheKey, (err, numRemoved) => {
            if (err) throw err;
            console.log(`Cleared cache for ${numRemoved} key(s)`);
            User.updateOne({ _id: userId }, req.body)
                .exec()
                .then(() => res.send('Update người dùng thành công'))
                .catch(() => res.send('Update người dùng thất bại'));
        });
    }

    // DELETE /admin/user/delete/:id
    DestroyUser(req, res, next) {
        const userId = req.params.id;
        const cacheKey = `user:${userId}`;
        client.del(cacheKey, (err, numRemoved) => {
            if (err) throw err;
            console.log(`Cleared cache for ${numRemoved} key(s)`);
            User.deleteOne({ _id: userId })
                .exec()
                .then(() => res.send('Xóa người dùng thành công!!'))
                .catch(() => res.send('Xóa người dùng thất bại!!'));
        });
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
