const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const User = new Schema(
    {
        _id :{type: Number},
        email: { type: String },
        name: { type: String },
        password: { type: String },
        avatar: { type: String },
        level: { type: Boolean },


    },
    { 
        _id: false,
        timestamps: true 
    },
);

User.pre('save', function(next) {
    const user = this;
    // chỉ mã hóa mật khẩu nếu nó đã được thay đổi hoặc là một tài khoản mới
    if (!user.isModified('password')) return next();
    // sử dụng bcrypt để mã hóa mật khẩu
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // lưu giá trị băm mật khẩu vào trường password
        user.password = hash;
        next();
      });
    });
  });

// Product.plugin(mongooseDelete);
// Product.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true,
// });
User.plugin(AutoIncrement);

// mongoose.model('ModelName', mySchema);
module.exports = mongoose.model('User', User);
