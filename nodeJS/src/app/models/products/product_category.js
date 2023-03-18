const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductCategory = new Schema(
    {
        _id :{type: Number},
        name: { type: String },
    },
    { 
        _id: false,
        timestamps: true 
    },
);

// ProductCategory.plugin(mongooseDelete);
// ProductCategory.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
ProductCategory.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('ProductCategory', ProductCategory);
