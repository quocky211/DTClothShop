const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const Discount = require('../models/order/discount');
const { multipleMongooseToObject } = require('../../util/mongoose');
const https = require('https');
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

class OrderController {
    // GET /product/discount
    // Discount(req, res, next) {
    //     Product.find({ discount: { $ne: 0, $ne: null } })
    //         .exec()
    //         .then((product) => res.json(product))
    //         .catch(next);
    // }
    // POST /order
    StoreOrder(req, res, next) {
        const order = new Order(req.body)
        order.save()
        .then(() => res.json(order._id))
        .catch()
    }
    // GET /discount/
    ShowDiscount(req, res, next) {
        Discount.find({})
            .exec()
            .then((discount) => res.json(product))
            .catch(next)
    }
    // GET /order/checkout
    
    ShowVNPayCheckOut(req, res, next) {
        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var config = require('config');
        var dateFormat = require('dateformat');

        var tmnCode = 'WZ5PH4S4';
        var secretKey = 'UYLWBXXUYFHRGCCWXAKEEQZZNPANUNAL';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = 'http://localhost:8888/order/vnpay_return';
        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        // var amount = req.body.amount;
        // var bankCode = req.body.bankCode;

        // var orderInfo = req.body.orderDescription;
        // var orderType = req.body.orderType;
        var amount = 1000;
        var bankCode = 'NCB';

        var orderInfo = 'req.body.orderDescription';
        var orderType = 'req.body.orderType';

        var locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl);
    }

    // GET /order/:id/order-detail
    ShowOderDetailByOrder(req, res, next) {
        OrderDetail.find({ order_id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
    // GET /order/order-detail/:id
    GetOrderDetail(req, res, next) {
        OrderDetail.find({ _id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
    StoreOrderDetail(req, res, next) {
        const order = new OrderDetail(req.body)
        order.save()
        .then(() => res.send('ok'))
        .catch()
    }
}
//đoạn code sắp xếp theo giá - sẽ chèn vào giao diện
// function sortProducts(sortOrder) {
//     axios.get('/products', {
//         params: {
//           sortBy: 'price',
//           sortOrder: sortOrder
//         }
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Xử lý dữ liệu trả về và hiển thị danh sách sản phẩm đã sắp xếp
//       })
//       .catch((error) => {
//         console.log(error);
//       });
// }

module.exports = new OrderController();
// export default SiteController;
