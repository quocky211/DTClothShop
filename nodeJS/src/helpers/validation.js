const Joi = require('joi');

const userValidate = (data) => {
    const userSchema = Joi.object({
        email: Joi.string()
            .email()
            .pattern(new RegExp('(@gmail.com$)|(@gm.uit.edu.vn$)|(@uit.edu.vn)|(@gmail.com.vn$)|(@yahoo.com$)'))
            .lowercase()
            .required(),
        password: Joi.string().min(6).max(30).required(),
        name: Joi.string().min(3).max(30).required(),
        avatar: Joi.string().required(),
        level: Joi.bool().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        // .message({ 'any.only': 'password does not match' }),
    });

    return userSchema.validate(data);
};

const loginValidate = (data) => {
    const userLogin = Joi.object({
        email: Joi.string()
            .email()
            .pattern(new RegExp('(@gmail.com$)|(@gm.uit.edu.vn$)|(@uit.edu.vn)|(@gmail.com.vn$)|(@yahoo.com$)'))
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
