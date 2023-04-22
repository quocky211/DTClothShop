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
            .then((product) => res.json(product))
            .catch(next);
    }

    // GET /product
    Product(req, res, next) {
        Product.find({ _id: req.params.id })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }

    // GET /product/:id/product-detail?color=:slug
    ProductDetail(req, res, next) {
        if (req.query.color) {
            ProductDetail.find({ product_id: req.params.id, color: req.query.color })
                .exec()
                .then((product) => res.json(product))
                .catch(next);
        } else {
            ProductDetail.find({ product_id: req.params.id })
                .exec()
                .then((product) => res.json(product))
                .catch(next);
        }

        // ProductDetail.find({ product_id: req.params.id })
        //     .populate('product_id')
        //     .exec()
        //     .then((productDetail) => res.json(productDetail));
    }

    // GET /category/:id
    Category(req, res, next) {
        Product.find({ category_id: req.params.id })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }

    // GET /category-detail/:id
    CategoryDetail(req, res, next) {
        Product.find({ category_detail_id: req.params.id })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }
    // GET /product/
    ProductShow(req, res, next) {
        const query = {};
        if (req.query.price) {
            if (req.query.price == 1) {
                query.price = { $lt: 100000 };
            } // giá nhỏ hơn giá được truyền từ giao diện
            if (req.query.price == 2) {
                query.price = { $lt: 300000, $gt: 100000 };
            }
            if (req.query.price == 3) {
                query.price = { $lt: 500000, $gt: 300000 };
            }
            if (req.query.price == 4) {
                query.price = { $gt: 500000 };
            }
        }
        if (req.query.category_detail_id) {
            query.category_detail_id = req.query.category_detail_id; // màu sắc phù hợp với màu được truyền từ giao diện
        }
        Product.find(query)
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }
}
//đoạn code sắp xếp theo giá - sẽ chèn vào giao diện
// function sortProducts(sortOrder) {
//     axios.get('/products', {
//         params: {
//           sortBy: 'price',
//           sortOrder: sortOrder
//         }
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Xử lý dữ liệu trả về và hiển thị danh sách sản phẩm đã sắp xếp
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// }

module.exports = new ProductController();
// export default SiteController;
