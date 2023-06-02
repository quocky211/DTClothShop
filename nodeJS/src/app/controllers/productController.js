const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const CategoryDetail = require('../models/products/category_detail');
const Outfit = require('../models/outfit/outfit');
const OutfitDetail = require('../models/outfit/outfit_detail');
const ProductComment = require('../models/products/product_comment');
const { HandleAddImage } = require('../../helpers/multifunction');
const client = require('../../helpers/connection_redis');
class ProductController {
    // GET /product/discount
    // Discount(req, res, next) {
    //     Product.find({ discount: { $ne: 0, $ne: null } })
    //         .exec()
    //         .then((products) => {
    //             const data = products.map(HandleAddImage);
    //             Promise.all(data).then((result) => {
    //                 res.json(result);
    //             });
    //         })
    //         .catch(next);
    // }

    Discount(req, res, next) {
        const cachedKey = 'discountedProducts';
        client.get(cachedKey, (err, cachedData) => {
            if (err) throw err;
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis');
                res.json(JSON.parse(cachedData));
            } else {
                Product.find({ discount: { $ne: 0, $ne: null } })
                    .exec()
                    .then((products) => {
                        const data = products.map(HandleAddImage);
                        Promise.all(data).then((result) => {
                            console.log('Thêm dữ liệu vào Redis');
                            client.setex(cachedKey, 1800, JSON.stringify(result));
                            res.json(result);
                        });
                    })
                    .catch(next);
            }
        });
    }

    // GET /product/top-selling
    // TopSelling(req, res, next) {
    //     Product.aggregate([{ $sample: { size: 10 } }])
    //         .exec()
    //         .then((products) => {
    //             const data = products.map(HandleAddImage);
    //             Promise.all(data).then((result) => {
    //                 res.json(result);
    //             });
    //         })
    //         .catch(next);
    // }
    TopSelling(req, res, next) {
        const cachedKey = 'topSellingProducts';
        client.get(cachedKey, (err, cachedData) => {
            if (err) throw err;
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis');
                res.json(JSON.parse(cachedData));
            } else {
                Product.aggregate([{ $sample: { size: 10 } }])
                    .exec()
                    .then((products) => {
                        const data = products.map(HandleAddImage);
                        Promise.all(data).then((result) => {
                            console.log('Thêm dữ liệu vào Redis');
                            client.setex(cachedKey, 1800, JSON.stringify(result));
                            res.json(result);
                        });
                    })
                    .catch(next);
            }
        });
    }

    // GET /product/new
    // New(req, res, next) {
    //     Product.find({})
    //         .sort({ createdAt: -1 })
    //         .limit(10)
    //         .exec()
    //         .then((products) => {
    //             const data = products.map(HandleAddImage);
    //             Promise.all(data).then((result) => {
    //                 res.json(result);
    //             });
    //         })
    //         .catch(next);
    // }
    New(req, res, next) {
        const cachedKey = 'newProducts';
        client.get(cachedKey, (err, cachedData) => {
            if (err) throw err;
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis');
                res.json(JSON.parse(cachedData));
            } else {
                Product.find({})
                    .sort({ createdAt: -1 })
                    .limit(10)
                    .exec()
                    .then((products) => {
                        const data = products.map(HandleAddImage);
                        Promise.all(data).then((result) => {
                            console.log('Thêm dữ liệu vào Redis');
                            client.setex(cachedKey, 1800, JSON.stringify(result));
                            res.json(result);
                        });
                    })
                    .catch(next);
            }
        });
    }

    // GET /product/:id
    // GetProduct(req, res, next) {
    //     Product.find({ _id: req.params.id })
    //         .exec()
    //         .then((product) => {
    //             const data = product.map(HandleAddImage);
    //             Promise.all(data).then((result) => res.json(result));
    //         })
    //         .catch(next);
    // }
    GetProduct(req, res, next) {
        const productId = req.params.id;
        client.get(`product:${productId}`, (err, cachedProduct) => {
            if (err) throw err;
            if (cachedProduct) {
                console.log('Lấy dữ liệu từ Redis');
                res.json(JSON.parse(cachedProduct));
            } else {
                Product.find({ _id: productId })
                    .exec()
                    .then((product) => {
                        const data = product.map(HandleAddImage);
                        Promise.all(data).then((result) => {
                            console.log('Thêm dữ liệu vào Redis');
                            client.setex(`product:${productId}`, 1800, JSON.stringify(result));
                            res.json(result);
                        });
                    })
                    .catch(next);
            }
        });
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
            .then((products) => {
                const data = products.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            })
            .catch(next);
    }

    // GET /category-detail/:id
    CategoryDetail(req, res, next) {
        Product.find({ category_detail_id: req.params.id })
            .exec()
            .then((products) => {
                const data = products.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                });
            })
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
    // ProductShow(req, res, next) {
    //     const query = {};
    //     // if (req.query.name) {
    //     //     query.name = { $regex: req.query.name, $options: 'i' };
    //     // }
    //     if (req.query.price) {
    //         if (req.query.price == 1) {
    //             query.price = { $lt: 100000 };
    //         } // giá nhỏ hơn giá được truyền từ giao diện
    //         if (req.query.price == 2) {
    //             query.price = { $lt: 300000, $gte: 100000 };
    //         }
    //         if (req.query.price == 3) {
    //             query.price = { $lt: 500000, $gte: 300000 };
    //         }
    //         if (req.query.price == 4) {
    //             query.price = { $gte: 500000 };
    //         }
    //     }
    //     if (req.query.category_detail_id) {
    //         query.category_detail_id = req.query.category_detail_id; // màu sắc phù hợp với màu được truyền từ giao diện
    //     }

    //     const page = req.query.page || 1;
    //     Product.paginate(query, { page: page, limit: 16, populate: { path: 'category_detail_id', select: 'name' } })
    //         .then((products) => {
    //             const data = products.docs.map(HandleAddImage);
    //             Promise.all(data).then((result) => {
    //                 res.json({
    //                     result,
    //                     totalDocs: products.totalDocs,
    //                     limit: products.limit,
    //                     totalPages: products.totalPages,
    //                     page: products.page,
    //                     pagingCounter: products.pagingCounter,
    //                     hasPrevPage: products.hasPrevPage,
    //                     hasNextPage: products.hasNextPage,
    //                     prevPage: products.prevPage,
    //                     nextPage: products.nextPage,
    //                 });
    //             });
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }

    ProductShow(req, res, next) {
        const query = {};

        if (req.query.price) {
            if (req.query.price == 1) {
                query.price = { $lt: 100000 };
            } else if (req.query.price == 2) {
                query.price = { $lt: 300000, $gte: 100000 };
            } else if (req.query.price == 3) {
                query.price = { $lt: 500000, $gte: 300000 };
            } else if (req.query.price == 4) {
                query.price = { $gte: 500000 };
            }
        }

        if (req.query.category_detail_id) {
            query.category_detail_id = req.query.category_detail_id;
        }

        const page = req.query.page || 1;
        const cacheKey = JSON.stringify({ query, page });

        // Check if the cached data exists
        client.get(cacheKey, (err, cachedData) => {
            if (err) {
                console.error('Redis cache error:', err);
                next();
            }

            // If cached data exists, return it
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis1');
                const parsedData = JSON.parse(cachedData);
                res.json(parsedData);
            } else {
                // If no cached data, query the database
                Product.paginate(query, {
                    page: page,
                    limit: 16,
                    populate: { path: 'category_detail_id', select: 'name' },
                })
                    .then((products) => {
                        const data = products.docs.map(HandleAddImage);
                        return Promise.all(data).then((result) => {
                            const responseData = {
                                result,
                                totalDocs: products.totalDocs,
                                limit: products.limit,
                                totalPages: products.totalPages,
                                page: products.page,
                                pagingCounter: products.pagingCounter,
                                hasPrevPage: products.hasPrevPage,
                                hasNextPage: products.hasNextPage,
                                prevPage: products.prevPage,
                                nextPage: products.nextPage,
                            };

                            // Store the fetched data in cache
                            console.log('Thêm dữ liệu vào Redis1');
                            client.setex(cacheKey, 1800, JSON.stringify(responseData));
                            res.json(responseData);
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }

    // GET /product/outfit
    // ShowOutfit(req, res, next) {
    //     const page = req.query.page || 1;
    //     Outfit.paginate({}, { page: page, limit: 12 })
    //         .then((outfit) => res.json(outfit))
    //         .catch(next);
    // }
    ShowOutfit(req, res, next) {
        const page = req.query.page || 1;
        const cacheKey = `outfit:${page}`;

        // Check if the cached data exists
        client.get(cacheKey, (err, cachedData) => {
            if (err) {
                console.error('Redis cache error:', err);
                next();
            }

            // If cached data exists, return it
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis2');
                const parsedData = JSON.parse(cachedData);
                res.json(parsedData);
            } else {
                // If no cached data, query the database
                Outfit.paginate({}, { page: page, limit: 12 })
                    .then((outfit) => {
                        // Store the fetched data in cache
                        console.log('Thêm dữ liệu vào Redis2');
                        client.setex(cacheKey, 1800, JSON.stringify(outfit));
                        res.json(outfit);
                    })
                    .catch(next);
            }
        });
    }

    // GET /product/outfit/:id
    // GetOutfit(req, res, next) {
    //     Outfit.find({ _id: req.params.id })
    //         .exec()
    //         .then((outfit) => res.json(outfit))
    //         .catch(next);
    // }
    GetOutfit(req, res, next) {
        const outfitId = req.params.id;
        const cacheKey = `outfit_${outfitId}`;

        // Check if the cached data exists
        client.get(cacheKey, (err, cachedData) => {
            if (err) {
                console.error('Redis cache error:', err);
                next();
            }

            // If cached data exists, return it
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis3');
                const parsedData = JSON.parse(cachedData);
                res.json(parsedData);
            } else {
                // If no cached data, query the database
                Outfit.find({ _id: outfitId })
                    .exec()
                    .then((outfit) => {
                        // Store the fetched data in cache
                        console.log('Thêm dữ liệu vào Redis3');
                        client.setex(cacheKey, 1800, JSON.stringify(outfit));
                        res.json(outfit);
                    })
                    .catch(next);
            }
        });

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

    // GET /product/:id/comment
    // ShowComment(req, res, next) {
    //     ProductComment.find({ product_id: req.params.id })
    //         .populate({ path: 'user_id', select: 'name' })
    //         .exec()
    //         .then((productComments) => res.json(productComments));
    // }
    ShowComment(req, res, next) {
        const productId = req.params.id;
        const cacheKey = `comments_${productId}`;

        // Check if the cached data exists
        client.get(cacheKey, (err, cachedData) => {
            if (err) {
                console.error('Redis cache error:', err);
                next();
            }

            // If cached data exists, return it
            if (cachedData) {
                console.log('Lấy dữ liệu từ Redis4');
                const parsedData = JSON.parse(cachedData);
                res.json(parsedData);
            } else {
                // If no cached data, query the database
                ProductComment.find({ product_id: productId })
                    .populate({ path: 'user_id', select: 'name' })
                    .exec()
                    .then((productComments) => {
                        // Store the fetched data in cache
                        console.log('Thêm dữ liệu vào Redis4');
                        client.setex(cacheKey,600, JSON.stringify(productComments));
                        res.json(productComments);
                    })
                    .catch(next);
            }
        });
    }
    // GET /product/:id/count-comment
    CountComment(req, res, next) {
        //     ProductComment.countDocuments({ product_id: req.params.id }).then((qty) => {
        //         ProductComment.aggregate([{ $match: '$product_id' }], {
        //             $group: {
        //                 _id: null,
        //                 avgStar: { $avg: '$star' },
        //             },
        //         })
        //             .exec()
        //             .then((avgStar) => {
        //                 res.json({
        //                     qty,
        //                     avgStar,
        //                 });
        //             });
        //     });
        // }

        ProductComment.find({ product_id: req.params.id })
            .exec()
            .then((comments) => {
                const qtyCmt = comments.length;
                let totalStar = 0;
                for (let i = 0; i < qtyCmt; i++) {
                    totalStar += comments[i].star;
                }
                const avgStar = totalStar / qtyCmt;
                res.json({
                    avgStar,
                    qtyCmt,
                });
            });
    }
    // DELETE /product/:id/comment
    // DeleteComment(req, res, next) {
    //     ProductComment.find({ product_id: req.params.id })
    //         .populate({ path: 'user_id', select: 'name' })
    //         .exec()
    //         .then((productComments) => res.json(productComments));
    // }
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
