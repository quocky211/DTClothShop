import axios from "axios";
class OrderDataService {

    async createOrders(data) {
        const res = await axios.post("https://thawing-hollows-39647.herokuapp.com/order/create", data);
        return res;
        }
    async createOrderDetail(data) {
            return await axios.post("https://thawing-hollows-39647.herokuapp.com/order/order-detail", data);
        }
    
    }
export default new OrderDataService();