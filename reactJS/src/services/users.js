import axios from "axios";

class UserDataService {
    async getAllUser() {
        return await axios.get("https://thawing-hollows-39647.herokuapp.com/admin/user/show")
    }
    async getUserById(userId) {
        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/user/${userId}`)
    }
    async createUser(data) {
        return await axios.post("https://thawing-hollows-39647.herokuapp.com/user/register",data)
    }
    async editUser(userId, data) {
        return await axios.put(`https://thawing-hollows-39647.herokuapp.com/admin/user/edit/${userId}`, data)
    }
    async deleteUser(userId) {
        return await axios.delete(`https://thawing-hollows-39647.herokuapp.com/admin/user/delete/${userId}`)
    }
    async createComment(productId, userId, data){
        return await axios.post(`https://thawing-hollows-39647.herokuapp.com/user/${userId}/product/${productId}/comment`, data)
    }
    async deleteComment(userId, commentId){
        return await axios.delete(`https://thawing-hollows-39647.herokuapp.com/user/${userId}/comment/${commentId}/delete`)
    }
    async getOrdersByUser(userId){
        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/user/${userId}/order`)
    }
}

export default new UserDataService();
