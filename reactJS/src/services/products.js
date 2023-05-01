import axios from "axios";
class ProductDataService {

   async getAllProductByTypeId(typeID) {

        return await axios.get(`http://localhost:3001/product/category/${typeID}`)
    }
    async getProductsByTypeDetailId(typeDetailID) {

        return await axios.get(`http://localhost:3001/product/category-detail/${typeDetailID}`)
    }
    async getAllProducts(price = 0, page = 1) {

        return await axios.get(`http://localhost:3001/product?price=${price}&&page=${page}`)
    }
    async getProductById(productID) {

        return await axios.get(`http://localhost:3001/product/${productID}`)
    }

    async getProductDetail(productID) {

        return await axios.get(`http://localhost:3001/product/${productID}/product-detail`)
    }
    async getProductDiscount() {

        return await axios.get('http://localhost:3001/product/discount')
    }
    async getProductNew() {

        return await axios.get('http://localhost:3001/product/new')
    }
    async getProductTopSelling() {

        return await axios.get('http://localhost:3001/product/top-selling')
    }

}
export default new ProductDataService();