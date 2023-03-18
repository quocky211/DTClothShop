const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Product = new Schema(
    {
        _id :{type: Number},
        brand_id: { type: Number },
        product_category_id: { type: Number },
        name: { type: String },
        description: { type: String },
        content: { type: Text },
        price: { type: Number },
        qty: { type: Number },
        discount: { type: Number },
        weight: { type: Number },
        featured: { type: Boolean },

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
Product.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Product', Product);
