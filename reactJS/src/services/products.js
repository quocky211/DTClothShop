import axios from "axios";
class ProductDataService {

   async getAllProductByTypeId(typeID) {

        return await axios.get(`http://localhost:3001/product/category/${typeID}`)
    }
    async getProductsByTypeDetailId(typeDetailID) {

        return await axios.get(`http://localhost:3001/product/category-detail/${typeDetailID}`)
    }
    async getProductById(productID) {

        return await axios.get(`http://localhost:3001/product/${productID}`)
    }

    async getProductDetail(productID) {

        return await axios.get(`http://localhost:3001/product/${productID}/product-detail`)
    }

}
export default new ProductDataService();