import React, { useState, useEffect } from "react";
import "./Products.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ContainerItem from "../ContainerItem";
import filtericon from "../Images/filter-icon.png";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import ProductDataService from "../../services/products";
import CatagoryDataService from "../../services/catagories";
import ao from "../Images/fakedata/ao1.jpg";

function Products() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [cataDetails, setCataDetails] = useState([]);
    let one = false;
    useEffect(() => {
        getProducts();
        if(!one){
            one = true;
            getAllCataDetail();
        }
    }, []);

    const getProducts = () =>{
        ProductDataService.getAllProducts()
        .then((res) => {
            setProducts( res.data.docs)})
        .catch(err => console.error(err))
    };

    const getAllCataDetail = () =>{
        CatagoryDataService.getAll()
        .then((res) => {
            const data = res.data;
            data.forEach(function(element) {
                CatagoryDataService.getAllDetail(element._id)
                .then((response) => {
                  setCataDetails(current => current.concat(response.data) )})
                .catch((err) => console.error(err));
            });
            })
        .catch(err => console.error(err))
    };

    return (
        <div>
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter">
                <>
                    <Button variant="primary" onClick={handleShow}>
                        <img src={filtericon} alt="filtericon" className="filter-img" /> Bộ lọc
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Bộ lọc</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <form action="">
                                <div className="container__products-nav">
                                    <p>Danh mục</p>
                                    {
                                        cataDetails.map( function(item){
                                            return <div className="">
                                                <label>
                                                    <input type="checkbox" name="type_product" id="" /> 
                                                    {item.name} 
                                                </label>
                                            </div>
                                        })
                                    }
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
                                    <input type="button" value="Áp dụng" />
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
                {products.map((item) => <ContainerItem price={item.price} name={item.name} image={ao} masp={item._id} />)}
            </div>
            <Footer/>
        </div>
    );
}

export default Products;
