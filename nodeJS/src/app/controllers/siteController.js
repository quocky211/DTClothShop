const Product = require('../models/products/product');
const Category = require('../models/products/category');
const CategoryDetail = require('../models/products/category_detail');
const { HandleAddImage } = require('../../helpers/multifunction');
const client = require('../../helpers/connection_redis');
class SiteController {
    // GET /category
    // GetCategory(req, res, next) {
    //     Category.find({})
    //         .exec()
    //         .then((category) => res.json(category))
    //         .catch(next);
    // }

    GetCategory(req, res, next) {
        const cacheKey = 'categories';
        client.get(cacheKey, async (err, category) => {
            if (err) {
                throw err;
            }

            if (category) {
                console.log('Lấy danh sách danh mục sản phẩm từ Redis');
                res.json(JSON.parse(category));
            } else {
                Category.find({})
                    .exec()
                    .then((category) => {
                        console.log('Lưu danh sách danh mục vào Redis');
                        // lưu dữ liệu vào cache với thời gian giống là 1800s
                        client.setex(cacheKey, 1800, JSON.stringify(category));
                        res.json(category);
                    })
                    .
                    catch(next);
            }
        });
    }

    // GET /category/:id/category-detail
    ShowCategoryDetail(req, res, next) {
        CategoryDetail.find({ category_id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }
    // GET /category-detail/:id
    GetCategoryDetail(req, res, next) {
        CategoryDetail.find({ _id: req.params.id })
            .exec()
            .then((categoryDetail) => res.json(categoryDetail))
            .catch(next);
    }

    // GET /search
    search(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({ name: { $regex: req.query.name, $options: 'i' } }, { page: page, limit: 16 })
            .then((products) => {
                const data = products.docs.map(HandleAddImage);
                Promise.all(data).then((result) => {
                    products.docs = result;
                    res.json(products);
                });
            })
            .catch(next);
    }
    sort(req, res, next) {
        Product.find()
            .sort({ _id: -1 })
            .exec()
            .then((product) => res.json(product));
    }
}

module.exports = new SiteController();
