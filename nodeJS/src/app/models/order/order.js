const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Order = new Schema(
    {
        _id: { type: Number },
        user_id: { type: Number, ref: 'user' },
        address: { type: String },
        note: { type: String, require: false },
        phone: { type: Number },
        pay_method: { type: Boolean },
        discount_code: { type: String, ref: 'discount', require: false },
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
Order.plugin(AutoIncrement, { id: 'order_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Order', Order);
