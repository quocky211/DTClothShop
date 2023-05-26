const ProductDetail = require('../app/models/products/product_detail');
const BlogComment = require('../app/models/blog/blog_comment');
const BlogImage = require('../app/models/blog/blog_image');
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
function HandleBlogComment(blog) {
    return BlogComment.find({blog_id : blog._id})
    .exec()
    .then((blogComment) => {
        return {
            blog,
            blogComment,
        };
    });
}
function HandleBlogImage(blog){
    return BlogImage.find({blog_id: blog._id})
    .exec()
    .then((blogImage) => {
        return {
            blog,
            path: blogImage[0].path,
        };
    });
}

module.exports = {
    HandleAddImage,
    HandleBlogComment,
    HandleBlogImage,
};
