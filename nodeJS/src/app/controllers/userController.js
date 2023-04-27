const httpError = require('http-errors');
const { userValidate, loginValidate } = require('../../helpers/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helpers/jwt_service');
const client = require('../../helpers/connection_redis');

const User = require('../models/user/user');
class UserController {
    async Register(req, res, next) {
        try {
            const { email } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }
            const isExistEmail = await User.findOne({ email: email });

            if (isExistEmail) throw httpError.Conflict(`${email} đã được đăng ký!!`);

            const formData = {
                // email: req.body.email,
                // password: req.body.password,
                // name: req.body.name,
                // avatar: req.body.avatar,
                // level: req.body.level,

                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                birthday: req.body.birthday,
                address: req.body.address,
                name: req.body.name,
                avatar: req.body.avatar,
                level: req.body.level,
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    // res.json({
                    //     status: 'successfully',
                    //     elements: user,
                    // });

                    res.send('Đăng ký tài khoản thành công');
                })
                .catch(() => res.send('Đăng ký tài khoản thất bại'));
        } catch (error) {
            next(error);
        }
    }

    async RefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            // verify token
            const { userId } = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const refToken = await signRefreshToken(userId);

            res.json({
                accessToken,
                refreshToken: refToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async Login(req, res, next) {
        try {
            const { error } = loginValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw httpError.NotFound(`${req.body.email} chưa được đăng ký!!`);
            }

            const isValidPassword = await user.isCheckPassword(req.body.password);
            if (!isValidPassword) {
                throw httpError.Unauthorized();
            }

            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            res.json({
                accessToken,
                refreshToken,
            });
        } catch (error) {
            next(error);
        }
    }
    async Logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            const { userId } = await verifyRefreshToken(refreshToken);
            client.del(userId.toString(), (err, reply) => {
                if (err) throw httpError.InternalServerError();

                res.json({
                    message: 'Logout',
                });
            });
        } catch (error) {
            next(error);
        }
    }

    TestGetListUser(req, res, next) {
        // console.log(req.headers);
        const list = [
            {
                email: 'aaaaa@gmail.com',
            },
            {
                email: 'aa565dadasdaaa@gmail.com',
            },
        ];

        res.json(list);
    }
}

module.exports = new UserController();
