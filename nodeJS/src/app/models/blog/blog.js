const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Blog = new Schema(
    {
        _id :{type: Number},
        user_id: { type: Number },
        title: { type: String },
        image: { type: String },
        category: { type: String },
        content: { type: Text }
        
    },
    { 
        _id: false,
        timestamps: true 
    },
);

// Product.plugin(mongooseDelete);
// Product.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
Blog.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Blog', Blog);
