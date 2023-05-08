const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Order = new Schema(
    {
        _id: { type: Number },
        user_id: { type: Number, ref: 'user' },
        address: { type: String },
        status: { type: String },
        note: { type: String, require: false },
        phone: { type: Number },
        pay_method: { type: Boolean },
        total: Number,
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
Order.plugin(mongoosePaginate);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Order', Order);
