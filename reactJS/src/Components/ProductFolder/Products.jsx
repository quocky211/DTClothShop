import React, { useState } from "react";
import "./Products.css";
import ProductsHeadphone from "./ProductsHeadphone";
import ProductsKeyboard from "./ProductsKeyboard";
import ProductsMouse from "./ProductsMouse";
import ProductsSpeaker from "./ProductsSpeaker";
import ProductsCharger from "./ProductsCharger";
import ProductsChargerBackup from "./ProductsChargerBackup";
// import Slideshow from "../Slideshow/Slideshow";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';


function Products() {
    const [active, setActive] = useState("ProductsHeadphone");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container__products">
                {/* <div className="container-left">
                    <div className="container__products-nav">
                        <p>DANH MỤC</p>
                        <button onClick={() => setActive("ProductsHeadphone")}>Áo</button>
                        <button onClick={() => setActive("ProductsKeyboard")}>Quần</button>
                        <button onClick={() => setActive("ProductsMouse")}>Phụ kiện</button>
                        <button onClick={() => setActive("ProductsCharger")}>Sạc / Cáp</button>
                        <button onClick={() => setActive("ProductsChargerBackup")}>Sạc dự phòng</button>
                        <button onClick={() => setActive("ProductsSpeaker")}>Loa</button>
                    </div>
                    <div className="find-product-price">
                        <p>Lọc giá sản phẩm</p>
                        <input type="radio" name="price" id="" />
                        <label> Dưới 100.000 đ</label>
                        <br></br>
                        <input type="radio" name="price" id="" />
                        <label> 100.000 đ - 300.000 đ</label>
                        <br></br>
                        <input type="radio" name="price" id="" />
                        <label> 300.000 đ - 500.000 đ</label>
                        <br></br>
                        <input type="radio" name="price" id="" />
                        <label> Trên 500.000 đ</label>
                        <br></br>
                    </div>
                </div> */}
                
                <div className="container-right">
                    <div className="sort-product">
                        <select name="" id="">
                            <option value="">Chọn</option>
                            <option value="">Giá từ thấp đến cao</option>
                            <option value="">Giá từ cao đến thấp</option>
                            <option value="">Từ A - Z</option>
                            <option value="">Từ Z - A</option>
                        </select>
                    </div>
                    <div className="container__products-products">
                        {active === "ProductsHeadphone" && <ProductsHeadphone />}
                        {active === "ProductsKeyboard" && <ProductsKeyboard />}
                        {active === "ProductsMouse" && <ProductsMouse />}
                        {active === "ProductsSpeaker" && <ProductsSpeaker />}
                        {active === "ProductsCharger" && <ProductsCharger />}
                        {active === "ProductsChargerBackup" && <ProductsChargerBackup />}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Products;
