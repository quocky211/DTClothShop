import axios from "axios";

class UserDataService {
    async getAllUser() {
        return await axios.get("http://localhost:3001/admin/user/show")
    }
    async createUser(data) {
        return await axios.post("http://localhost:3001/admin/user/store",data)
    }
    async editUser(userId, data) {
        return await axios.put(`http://localhost:3001/admin/user/edit/${userId}`, data)
    }
    async deleteUser(userId) {
        return await axios.delete(`http://localhost:3001/admin/user/delete/${userId}`)
    }
    async createComment(productId, userId, data){
        return await axios.post(`http://localhost:3001/user/${userId}/product/${productId}/comment`, data)
    }
}

export default new UserDataService();
