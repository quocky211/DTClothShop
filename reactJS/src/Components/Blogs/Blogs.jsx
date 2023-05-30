import Breadcrumb from 'react-bootstrap/Breadcrumb';
import  "./Blogs.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import BlogDataService from "../../services/blogs";

import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
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
                    <div className="blogDetailItem">
                        <div className="blogDetailImg">
                            <img src={item.path} alt="img" />
                        </div>
                        <div className="blogDetailInfor">
                            <p className='blogDetailTitle'>{item.blog.title}</p>
                            {/* <p className="blogDetailDes"></p> */}
                            <Link to={"/Blogs/"+ item.blog._id}>
                                 <button>Xem chi tiết</button>
                            </Link>
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