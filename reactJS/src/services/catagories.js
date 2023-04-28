import axios from "axios";
class CatagoryDataService {
    getAll() {

        return axios.get('http://localhost:3001/category')
    }
    getAllDetail(typeId) {
        return axios.get(`http://localhost:3001/category/${typeId}/category-detail`)
    }
}
export default new CatagoryDataService();