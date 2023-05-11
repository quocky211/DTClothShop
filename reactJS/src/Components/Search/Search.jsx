import React, { useState, useEffect } from "react";
import "./Search.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";
import ProductDataService from "../../services/products";
import ao from '../Images/fakedata/ao1.jpg'
import ContainerItem from '../ContainerItem';

export default function Search(props) {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductDataService.getProductsFromSearch(state.search)
      .then((res) => setProducts(res.data.docs))
      .catch((err) => console.log(err));
  }, [products]);

  return (
    <div>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item active>{state.search}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="search-list-products">
        {products.map((product) => (
          <ContainerItem
            price={product.price}
            name={product.name}
            image={ao}
            masp={product._id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
