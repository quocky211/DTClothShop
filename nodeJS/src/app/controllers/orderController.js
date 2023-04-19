const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');
const Discount = require('../models/order/discount');
const { multipleMongooseToObject } = require('../../util/mongoose');

class OrderController {
    // GET /product/discount
    Discount(req, res, next) {
        Product.find({ discount: { $ne: 0, $ne: null } })
            .exec()
            .then((product) => res.json(product))
            .catch(next);
    }
    // POST /order
    StoreOrder(req, res, next){
        const formDataOrder = {
            user_id: req.body.user_id,
            address: req.body.address,
            note: req.body.note,
            phone: req.body.phone,
            pay_method: req.body.pay_method,
            discount_code: req.body.discount_code,
        };

        const order = new Order(formDataOrder);
        order
            .save()
            .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }
    // GET /product/
    
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