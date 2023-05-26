const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const BlogComment = new Schema(
    {
        _id: { type: Number },
        user_id: { type: Number, ref: 'user' },
        blog_id: { type: Number, ref: 'blog' },
        message: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Product.plugin(mongooseDelete);
// Product.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
BlogComment.plugin(AutoIncrement, { id: 'blog_cmt_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('blog_comment', BlogComment);
