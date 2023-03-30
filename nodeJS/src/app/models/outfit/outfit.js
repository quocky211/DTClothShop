const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Outfit = new Schema(
    {
        _id: { type: Number },
        content: { type: String },
        image: { type: String },
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
Outfit.plugin(AutoIncrement, { id: 'outfit_id_counter' });

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('outfit', Outfit);
