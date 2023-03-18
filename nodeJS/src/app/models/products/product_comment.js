const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductComment = new Schema(
    {
        _id :{type: Number},
        product_id: { type: Number },
        user_id: { type: Number },
        name: { type: String },
        email: { type: String },
        message: { type: String },
        rating: { type: Number },

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
ProductComment.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('ProductComment', ProductComment);
