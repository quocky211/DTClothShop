import axios from "axios";
class ProductDataService {
  async getAllProductByTypeId(typeID) {
    return await axios.get(`https://thawing-hollows-39647.herokuapp.com/product/category/${typeID}`);
  }
  async getProductsByTypeDetailId(typeDetailID) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/product/category-detail/${typeDetailID}`
    );
  }
  async getAllProducts(price = 0, category = "", page = 1) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/product?price=${price}&page=${page}&${category}`
    );
  }
  async getProductById(productID) {
    return await axios.get(`https://thawing-hollows-39647.herokuapp.com/product/${productID}`);
  }

  async getProductDetail(productID) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/product/${productID}/product-detail`
    );
  }
  async deleteProductDetail(productDetailID) {
    return await axios.delete(
      `https://thawing-hollows-39647.herokuapp.com/admin/product-detail/delete/${productDetailID}`
    );
  }
  async getProductDiscount() {
    return await axios.get("https://thawing-hollows-39647.herokuapp.com/product/discount");
  }
  async getProductsFromSearch(search) {
    return await axios.get(`https://thawing-hollows-39647.herokuapp.com/search?name=${search}`);
  }
  async getProductNew() {
    return await axios.get("https://thawing-hollows-39647.herokuapp.com/product/new");
  }
  async getProductTopSelling() {
    return await axios.get("https://thawing-hollows-39647.herokuapp.com/product/top-selling");
  }
  async adminGetProducts() {
    return await axios.get("https://thawing-hollows-39647.herokuapp.com/admin/product");
  }
  async createProducts(data) {
    return await axios.post("https://thawing-hollows-39647.herokuapp.com/admin/product/store", data);
  }
  async editProduct(productId, data) {
    return await axios.put(
      `https://thawing-hollows-39647.herokuapp.com/admin/product/edit/${productId}`,
      data
    );
  }
  async deleteProduct(productId) {
    return await axios.delete(
      `https://thawing-hollows-39647.herokuapp.com/admin/product/delete/${productId}`
    );
  }
  async createDetailProduct(data) {
    return await axios.post(
      "https://thawing-hollows-39647.herokuapp.com/admin/product-detail/store",
      data
    );
  }
  async getCommentsByProductId(productId) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/product/${productId}/comment`
    );
  }
  async getCommentCountAndAvgRating(productId) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/product/${productId}/count-and-starrating-comment`
    );
  }
  async getAllFavoriteProduct(email) {
    return await axios.get(`https://thawing-hollows-39647.herokuapp.com/${email}/favorite-product`);
  }

  async getFavoriteProductById(email, productId) {
    return await axios.get(
      `https://thawing-hollows-39647.herokuapp.com/${email}/favorite-product/${productId}`
    );
  }

  async addFavoriteProduct(data) {
    return await axios.post("https://thawing-hollows-39647.herokuapp.com/favorite-product/add", data);
  }

  async deleteFavoriteProduct(data) {
    return await axios.post(
      "https://thawing-hollows-39647.herokuapp.com/favorite-product/delete",
      data
    );
  }
}
export default new ProductDataService();
