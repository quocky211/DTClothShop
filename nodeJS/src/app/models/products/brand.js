const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Brand = new Schema(
    {
        _id :{type: Number},
        name: { type: String },
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
Brand.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('Brand', Brand);
