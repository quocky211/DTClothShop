import React, {useEffect, useState} from "react";
import "./BlogDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useParams } from "react-router-dom";
import BlogDataService from "../../services/blogs";
import  { marked }  from "marked";
function nl2br(text) {
  text = String(text);
  const lines = text.split('\n');
  return lines.join('<br>');
}

export default function BlogDetail() {
    const { blogID } = useParams();

    const [blogDetail, setBlogDetail] = useState([])
    const [blogcmt, setBlogCmt] = useState([])
    
    useEffect(() => {
      getBlogDetail();
      }, []);
    const getBlogDetail = () => {
        BlogDataService.getBlogById(blogID)
        .then((res) => {
          setBlogDetail(res.data[0].blog);
          setBlogCmt(res.data[0].blogComment)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const htmlContent = marked.parse('<p>blogDetail.content</p>')
    // console.log(typeof(convertedContent));
    // console.log((convertedContent));
    // document.getElementById("blogContent").innerHTML = htmlContent;
    console.log(blogDetail);
  return (
    <div>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Blogs">Bài viết</Breadcrumb.Item>
        <Breadcrumb.Item active>{blogDetail.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="blogContent">
        <h2 className="blogContentTitle">{blogDetail.title}</h2>
        <p className="user">Được đăng bởi <img src="https://png.pngtree.com/png-vector/20210128/ourlarge/pngtree-flat-default-avatar-png-image_2848906.jpg" alt="user" /> {blogDetail.user_id.name}</p>
        <div className="blogContentPara" dangerouslySetInnerHTML={{ __html: nl2br(blogDetail.content) }}></div>
      </div>
      <Footer />
      {
      
        }
    </div>     
  );
}
