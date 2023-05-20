import React from "react";
import "./BlogDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useParams } from "react-router-dom";

export default function BlogDetail() {

    const { blogId } = useParams();

  return (
    <div>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Blogs">Bài viết</Breadcrumb.Item>
        <Breadcrumb.Item active>Bài viết đến từ đại dương</Breadcrumb.Item>
      </Breadcrumb>
      <div className="blogDetail">

      </div>
      <Footer />
    </div>
  );
}
