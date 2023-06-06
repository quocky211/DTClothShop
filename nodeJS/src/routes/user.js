const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const { verifyAccessToken } = require('../helpers/jwt_service');

router.post('/register', userController.Register);
router.post('/refresh-token', userController.RefreshToken);
router.post('/login', userController.Login);
router.delete('/logout', userController.Logout);
// router.get('/test-get-list-user', verifyAccessToken, userController.TestGetListUser);

router.get('/:id', userController.GetUser);
router.get('/:id/order', userController.GetOrder);

router.patch('/:id', userController.EditUser);

router.post('/:user_id/product/:product_id/comment', userController.StoreComment);
router.delete('/:user_id/comment/:comment_id/delete', userController.DeleteComment);
router.get('/:user_id/product/:product_id/bought', userController.CheckUserBought);

module.exports = router;
