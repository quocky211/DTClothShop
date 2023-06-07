import Breadcrumb from 'react-bootstrap/Breadcrumb';
import  "./Blogs.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import BlogDataService from "../../services/blogs";

import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
// import blog from '../../../../nodeJS/src/app/models/blog/blog';
function Blogs()
{
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        getBlogs();
      }, []);
    const getBlogs = () => {
        BlogDataService.getAllBlog()
        .then((res) => {
            setBlogs(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    blogs.map((item) => {
        // console.log(item.blog.user_id.name)
    })
    console.log(blogs);
    return (
        <div className="">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bài viết</Breadcrumb.Item>
            </Breadcrumb>
            <div className="blogs-container">
                <h2>Những bài viết hay về thời trang</h2>
                <div className="blogDetail">
                {blogs.map((item) => (
                    <div className="card">
                        <div className="card-header">
                            <img src={item.path} alt="img" />
                        </div>
                        <div className="card-body">
                        <span class="tag tag-teal">Fashion</span>
                            <Link to={"/Blogs/"+ item.blog._id}>
                            <h4>{item.blog.title}</h4>
                            </Link>
                            <div class="user">
                                <img src="https://png.pngtree.com/png-vector/20210128/ourlarge/pngtree-flat-default-avatar-png-image_2848906.jpg" alt="user" />
                                <div class="user-info">
                                {item.blog.user_id && (<h5>{item.blog.user_id.name}</h5>)}
                                <small>1w ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))
            }
            </div>
            </div>
            <Footer/>
        </div>
    );
}
export default Blogs;