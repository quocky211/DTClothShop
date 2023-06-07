import axios from "axios";
class OrderDataService {
  async createOrders(data) {
    const res = await axios.post(
      "https://thawing-hollows-39647.herokuapp.com/order/create",
      data
    );
    return res;
  }
  async createOrderDetail(data) {
    return await axios.post(
      "https://thawing-hollows-39647.herokuapp.com/order/order-detail",
      data
    );
  }
  async getOrderDetail(orderId) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/order/${orderId}/order-detail`
    );
  }
  async getAllOrders() {
    return await axios.get(
      'https://thawing-hollows-39647.herokuapp.com/admin/order/show/'
    );
  }
  async deleteOrder(orderId) {
    return await axios.delete(
      `https://thawing-hollows-39647.herokuapp.com/admin/order/${orderId}/delete`
    );
  }
  async editOrder(orderId, data) {
    return await axios.put(
      `https://thawing-hollows-39647.herokuapp.com/admin/order/${orderId}/change-status`, data
    );
  }
  async getRevenue(year) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/revenue?year=${year}`
    );
  }
}
export default new OrderDataService();
