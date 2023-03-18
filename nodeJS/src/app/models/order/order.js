const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Order = new Schema(
    {
        _id :{type: Number},
        user_id: { type: Number },
        address: { type: Text },
        email: { type: String },
        phone: { type: Number },
        pay_method: { type: String },
        status: { type: String },
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
Order.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Order', Order);
