const Joi = require('joi');

const userValidate = (data) => {
    const userSchema = Joi.object({
        email: Joi.string()
            .email()
            .pattern(
                new RegExp('(@gmail.com$)|(@gm.uit.edu.vn$)|(@uit.edu.vn)|(@gmail.com.vn$)|(@yahoo.com$)|(@gmail.vn$)'),
            )
            .lowercase()
            .required(),
        password: Joi.string().min(6).max(30).required(),
        gender: Joi.string().required(),
        birthday: Joi.date().required(),
        address: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        avatar: Joi.string().default(null),
        level: Joi.bool().default(false),
        confirmPassword: Joi.string().valid(Joi.ref('password')),
        // .message({ 'any.only': 'password does not match' }),
    });

    return userSchema.validate(data);
};

const loginValidate = (data) => {
    const userLogin = Joi.object({
        email: Joi.string()
            .email()
            .pattern(
                new RegExp('(@gmail.com$)|(@gm.uit.edu.vn$)|(@uit.edu.vn)|(@gmail.com.vn$)|(@yahoo.com$)|(@gmail.vn$)'),
            )
            .lowercase()
            .required(),
        password: Joi.string().min(6).max(30).required(),
    });
    return userLogin.validate(data);
};

module.exports = {
    userValidate,
    loginValidate,
};
