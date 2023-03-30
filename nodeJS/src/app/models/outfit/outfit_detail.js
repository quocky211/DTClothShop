const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const OutfitDetail = new Schema(
    {
        _id: { type: Number },
        outfit_id: { type: Number, ref: 'outfit' },
        product_id: { type: Number, ref: 'product' },
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
OutfitDetail.plugin(AutoIncrement, { id: 'outfit_detail_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('outfit_detail', OutfitDetail);
