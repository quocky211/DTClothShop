import axios from "axios";
class OrderDataService {

    async createOrders(data) {
        return await axios.post("http://localhost:3001/order/create", data)
        }
}
export default new OrderDataService();