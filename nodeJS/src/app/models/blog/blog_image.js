const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const BlogImage = new Schema(
    {
        _id: { type: Number },
        blog_id: { type: Number, ref: 'blog' },
        path: { type: String },
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
BlogImage.plugin(AutoIncrement, { id: 'blog_img_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('blog_image', BlogImage);
