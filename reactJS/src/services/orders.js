import axios from "axios";
class OrderDataService {

    async createOrders(data) {
        const res = await axios.post("http://localhost:3001/order/create", data);
        return res;
        }
        async createOrderDetail(data) {
            return await axios.post("http://localhost:3001/order/order-detail", data);
        }
}
export default new OrderDataService();