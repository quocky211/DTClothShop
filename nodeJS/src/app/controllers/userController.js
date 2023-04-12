const httpError = require('http-errors');
const User = require('../models/user/user');
const { userValidate, loginValidate } = require('../../util/validation');
class UserController {
    async Register(req, res, next) {
        try {
            const { email } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }
            const isExistEmail = await User.findOne({ email: email });

            if (isExistEmail) throw httpError.Conflict(`${email} is already been registered!!`);

            const formData = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                avatar: req.body.avatar,
                level: req.body.level,
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    res.json({
                        status: 'successfully',
                        elements: user,
                    });
                })
                .catch(next);
        } catch (error) {
            next(error);
        }
    }

    RefreshToken(req, res, next) {}

    async Login(req, res, next) {
        try {
            const { error } = loginValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw httpError.NotFound('User is not registered ');
            }

            const isValidPassword = await user.isCheckPassword(req.body.password);
            if (!isValidPassword) {
                throw httpError.Unauthorized();
            }

            res.send(user);
        } catch (error) {
            next(error);
        }
    }
    Logout(req, res, next) {}
}

module.exports = new UserController();
