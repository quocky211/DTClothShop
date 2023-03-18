const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OrderDetail = new Schema(
    {
        _id :{type: Number},
        order_id: { type: Number },
        product_id: { type: Number },
        amount: { type: Number },
        total: { type: Number },
        qty: { type: Number }

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
OrderDetail.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('OrderDetail', OrderDetail);
