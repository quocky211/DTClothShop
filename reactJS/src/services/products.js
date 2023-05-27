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
    async getProductsFromSearch(search) {

        return await axios.get(`http://localhost:3001/search?name=${search}`)
    }
    async getProductNew() {

        return await axios.get('http://localhost:3001/product/new')
    }
    async getProductTopSelling() {

        return await axios.get('http://localhost:3001/product/top-selling')
    }
    async adminGetProducts() {

        return await axios.get('http://localhost:3001/admin/product')
    }
    async createProducts(data) {
        return await axios.post("http://localhost:3001/admin/product/store", data)
        }
    async editProduct(productId,data) {
        return await axios.put(`http://localhost:3001/admin/product/edit/${productId}`, data)
    }
    async deleteProduct(productId) {
        return await axios.delete(`http://localhost:3001/admin/product/delete/${productId}`)
    }
    async createDetailProduct(data) {
        return await axios.post("http://localhost:3001/admin/product-detail/store", data)
    }
    async getCommentsByProductId(productId){
        return await axios.get(`http://localhost:3001/product/${productId}/comment`);
    }
}
export default new ProductDataService();