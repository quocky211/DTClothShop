import axios from "axios";
class CatagoryDataService {
    getAll() {

        return axios.get('https://thawing-hollows-39647.herokuapp.com/category')
    }
    getAllDetail(typeId) {
        return axios.get(`https://thawing-hollows-39647.herokuapp.com/category/${typeId}/category-detail`)
    }
    getCataDetailById(detailId) {
        return axios.get(`https://thawing-hollows-39647.herokuapp.com/category-detail/${detailId}`)
    }
    getAllCataDetail() {
        return axios.get('https://thawing-hollows-39647.herokuapp.com/product/category-detail')
    }
}
export default new CatagoryDataService();