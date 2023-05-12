const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const CategoryDetail = require('../models/products/category_detail');
const Outfit = require('../models/outfit/outfit');
const OutfitDetail = require('../models/outfit/outfit_detail');

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

    // GET /category-detail
    ShowCategoryDetail(req, res, next) {
        CategoryDetail.find()
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    // GET /product/
    ProductShow(req, res, next) {
        const query = {};
        // if (req.query.name) {
        //     query.name = { $regex: req.query.name, $options: 'i' };
        // }
        if (req.query.price) {
            if (req.query.price == 1) {
                query.price = { $lt: 100000 };
            } // giá nhỏ hơn giá được truyền từ giao diện
            if (req.query.price == 2) {
                query.price = { $lt: 300000, $gte: 100000 };
            }
            if (req.query.price == 3) {
                query.price = { $lt: 500000, $gte: 300000 };
            }
            if (req.query.price == 4) {
                query.price = { $gte: 500000 };
            }
        }
        if (req.query.category_detail_id) {
            query.category_detail_id = req.query.category_detail_id; // màu sắc phù hợp với màu được truyền từ giao diện
        }

        // const page = req.query.page || 1;
        // Product.paginate(query, { page: page, limit: 16 })
        //     // .populate({ path: 'category_detail_id', select: 'name' })
        //     // .exec()
        //     .then((products) => {
        //         res.json(products);
        //     });

        const page = req.query.page || 1;
        Product.paginate(query, { page: page, limit: 16, populate: { path: 'category_detail_id', select: 'name' } })
            .then((products) => {
                const data = products.docs.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            })
            .catch((err) => {
                console.error(err);
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

    // GET /product/outfit
    ShowOutfit(req, res, next) {
        const page = req.query.page || 1;
        Outfit.paginate({}, { page: page, limit: 12 })
            .then((outfit) => res.json(outfit))
            .catch(next);
    }

    // GET /product/outfit/:id
    GetOutfit(req, res, next) {
        Outfit.find({ _id: req.params.id })
            .exec()
            .then((outfit) => res.json(outfit))
            .catch(next);
    }

    // GET /product/outfit/:id/outfit-detail
    ShowOutfitDetail(req, res, next) {
        OutfitDetail.find({ outfit_id: req.params.id })
            .populate({ path: 'product_id', select: 'name price' })
            .exec()
            .then((outfitDetails) => {
                const data = outfitDetails.map(HandleAddProductDetail);
                Promise.all(data)
                    .then((results) => {
                        res.json(results);
                    })
                    .catch(next);
            })
            .catch(next);

        function HandleAddProductDetail(outfitDetail) {
            return ProductDetail.find({ product_id: outfitDetail.product_id._id })
                .exec()
                .then((productDetail) => {
                    return {
                        _id: outfitDetail._id,
                        outfit_id: outfitDetail.outfit_id,
                        product_id: {
                            _id: outfitDetail.product_id._id,
                            name: outfitDetail.product_id.name,
                            price: outfitDetail.product_id.price,
                        },
                        productDetail,
                    };
                });
        }
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
