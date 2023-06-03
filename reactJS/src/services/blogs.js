import axios from "axios";
class BlogDataService {

    async getAllBlog() {

        return await axios.get('https://thawing-hollows-39647.herokuapp.com/blog')
    }
    async getBlogById(blogID) {

        return await axios.get(`https://thawing-hollows-39647.herokuapp.com/blog/blog-detail/${blogID}`)
    }

}
export default new BlogDataService();