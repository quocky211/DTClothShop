import React, {useEffect, useState} from "react";
import "./BlogDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useParams } from "react-router-dom";
import BlogDataService from "../../services/blogs";

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
        <p className="blogContentPara">{blogDetail.content}</p>
      </div>
      <Footer />
    </div>
  );
}
