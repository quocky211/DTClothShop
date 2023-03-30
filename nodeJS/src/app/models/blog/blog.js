const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Blog = new Schema(
    {
        _id: { type: Number },
        user_id: { type: Number, ref: 'user' },
        title: { type: String },
        content: { type: String },
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
Blog.plugin(AutoIncrement, { id: 'blog_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('blog', Blog);
