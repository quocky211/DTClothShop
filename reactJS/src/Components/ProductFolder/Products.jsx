import React, { useState, useEffect } from "react";
import "./Products.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContainerItem from "../ContainerItem";
import filtericon from "../Images/filter-icon.png";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import ProductDataService from "../../services/products";
import CatagoryDataService from "../../services/catagories";
import Pagination from "react-bootstrap/Pagination";

function Products() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(0);
  const [cataDetails, setCataDetails] = useState([]);


  useEffect(() => {
    getProducts(price, currentPage);
    getAllCataDetail();
    
  }, [currentPage, price]);

  const getProducts = (price, page) => {
    ProductDataService.getAllProducts(price, page)
      .then((res) => {
        setProducts(res.data.result);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  const getAllCataDetail = () => {
    CatagoryDataService.getAllCataDetail()
      .then((res) => {
        setCataDetails(res.data)
      })
      .catch((err) => console.error(err));
  };

  const handleCurrPage = (event, number) => {
    setCurrentPage(number);
  };
  const handleFilter = (event) => {
    // console.log(event.target.value)
    // setPrice(event.target.value);
  };
  let items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={(e) => handleCurrPage(e, number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="filter">
        <>
          <Button variant="primary" onClick={handleShow}>
            <img src={filtericon} alt="filtericon" className="filter-img" /> Bộ
            lọc
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Bộ lọc</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <form action="">
                <div className="container__products-nav">
                  <p>Danh mục</p>
                  {cataDetails.map(function (item) {
                    return (
                      <div className="">
                        <label>
                          <input type="checkbox" name="type_product" id="" />
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="find-product-price">
                  <p>Lọc giá sản phẩm</p>
                  <input type="radio" name="price" id="1" />
                  <label htmlFor="1"> Dưới 100.000 đ</label>
                  <br></br>
                  <input type="radio" name="price" id="2" />
                  <label htmlFor="2"> 100.000 đ - 300.000 đ</label>
                  <br></br>
                  <input type="radio" name="price" id="3" />
                  <label htmlFor="3"> 300.000 đ - 500.000 đ</label>
                  <br></br>
                  <input type="radio" name="price" id="4" />
                  <label htmlFor="4"> Trên 500.000 đ</label>
                  <br></br>
                </div>
                <div className="filter-button">
                  <input type="button" value="Áp dụng" onClick={handleFilter} />
                </div>
              </form>
            </Offcanvas.Body>
          </Offcanvas>
        </>

        <div className="sort-product">
          <select name="" id="">
            <option value="">Chọn</option>
            <option value="">Giá từ thấp đến cao</option>
            <option value="">Giá từ cao đến thấp</option>
            <option value="">Từ A - Z</option>
            <option value="">Từ Z - A</option>
          </select>
        </div>
      </div>
      <div className="all-product-store">
        {products.map((item) => (
          <ContainerItem
            price={item.product.price}
            name={item.product.name}
            image={item.path}
            masp={item.product._id}
          />
        ))}
      </div>
      <div className="page">
        <Pagination>{items}</Pagination>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
