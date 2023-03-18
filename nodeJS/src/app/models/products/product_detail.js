const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductDetail = new Schema(
    {
        _id :{type: Number},
        product_id: { type: Number },
        color: { type: String },
        size: { type: String },
        qty :{type: Number},

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
ProductDetail.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('ProductDetail', ProductDetail);
