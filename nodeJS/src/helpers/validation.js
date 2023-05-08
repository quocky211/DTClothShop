const Joi = require('joi');

const userValidate = (data) => {
    const phoneRegex = /^(\+?84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-4|6-9])([0-9]{7})$/;
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
        level: Joi.bool().default(false),
        // phone: Joi.extend(require('joi-phone-number'))
        //     .string()
        //     .required()
        //     .phoneNumber({ defaultCountry: 'VN', format: 'national' }),
        phone: Joi.string().required().pattern(phoneRegex),
        confirmPassword: Joi.string().valid(Joi.ref('password')),
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
