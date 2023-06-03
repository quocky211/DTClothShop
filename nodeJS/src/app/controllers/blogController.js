const Blog = require('../models/blog/blog');
const BlogComment = require('../models/blog/blog_comment');
const { HandleBlogComment, HandleBlogImage } = require('../../helpers/multifunction');
class BlogController {
    // GET /blog
    ShowBlogs(req, res, next) {
        Blog.find({})
            .populate({ path: 'user_id', select: 'name' })
            .exec()
            .then((blogs) => {
                const data = blogs.map(HandleBlogImage);
                Promise.all(data).then((result) => {
                    res.json(result);
                })
            })
            .catch(next);
    }

    // GET /blog/detail/:id
    ShowBlogDetail(req, res, next) {
        Blog.find({ _id: req.params.id })
        .populate({ path: 'user_id', select: 'name' })
        .exec()
        .then((blogs) => {
            const data = blogs.map(HandleBlogComment);
                Promise.all(data).then((result) => {
                    res.json(result);
                })
        })
        .catch(next);
}
}
   
module.exports = new BlogController();
// export default SiteController;
