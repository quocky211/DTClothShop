import React, { useState } from "react";
import "./Products.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FakeData } from "../fakedata";
import ContainerItem from "../ContainerItem";

function Products() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter">
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Bộ lọc
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Áp dụng</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="container__products-nav">
                                <p>Danh mục</p>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Áo thun </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Áo khoác </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Áo polo</label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Áo sơ mi </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Váy </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Quần ngắn </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Quần kaki </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Quần jean </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Nón </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Balo </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Thắt lưng / Dây nịt </label>
                                <br></br>
                                <input type="checkbox" name="type_product" id="" />
                                <label> Ví </label>
                                <br></br>
                                {/* <button onClick={() => setActive("ProductsHeadphone")}>Áo</button>
                                <button onClick={() => setActive("ProductsKeyboard")}>Quần</button>
                                <button onClick={() => setActive("ProductsMouse")}>Phụ kiện</button>
                                <button onClick={() => setActive("ProductsCharger")}>Sạc / Cáp</button>
                                <button onClick={() => setActive("ProductsChargerBackup")}>Sạc dự phòng</button>
                                <button onClick={() => setActive("ProductsSpeaker")}>Loa</button> */}
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
            <div className="">
            {FakeData[0].map((item,index)=> <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp}/>)}
            </div>
        </div>
    );
}

export default Products;
