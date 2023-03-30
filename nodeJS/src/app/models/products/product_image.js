const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductImage = new Schema(
    {
        _id: { type: Number },
        product_id: { type: Number, ref: 'product' },
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
ProductImage.plugin(AutoIncrement, { id: 'product_image_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('product_image', ProductImage);
