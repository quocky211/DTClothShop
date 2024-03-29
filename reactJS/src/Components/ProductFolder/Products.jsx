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

const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function Products() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState(0);
    const [category, setCate] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [cataDetails, setCataDetails] = useState([]);

    useEffect(() => {
        getProducts(price, categoryQuery, currentPage);
        getAllCataDetail();
    }, [currentPage, categoryQuery, price]);

    const getProducts = (price, categoryQuery, page) => {
        ProductDataService.getAllProducts(price, categoryQuery, page)
            .then((res) => {
                setProducts(res.data.result);
                setTotalPage(res.data.totalPages);
            })
            .catch((err) => console.error(err));
    };

    const getAllCataDetail = () => {
        CatagoryDataService.getAllCataDetail()
            .then((res) => {
                setCataDetails(res.data);
            })
            .catch((err) => console.error(err));
    };

    const handleCurrPage = (event, number) => {
        setCurrentPage(number);
    };
    // filters
    const handleCheckboxChange = (value) => {
        if (category.includes(value)) {
            // Nếu giá trị đã tồn tại trong mảng, ta loại bỏ nó (khi ta bỏ chọn)
            setCate(category.filter((item) => item !== value));
        } else {
            // Nếu giá trị chưa tồn tại trong mảng, ta thêm nó vào
            setCate([...category, value]);
        }
    };
    const queryCate = (category) => {
        const result = category.reduce(function (query, item) {
            return query + "category_detail_id=" + item + "&";
        }, "");
        setCategoryQuery(result);
    };

    const handleFilter = (event) => {
        queryCate(category);
        console.log(categoryQuery);
    };

    //page
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
                        <img
                            src={filtericon}
                            alt="filtericon"
                            className="filter-img"
                        />{" "}
                        Bộ lọc
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
                                                    <input
                                                        type="checkbox"
                                                        name="type_product"
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                item._id
                                                            )
                                                        }
                                                    />
                                                    {item.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="find-product-price">
                                    <p>Lọc giá sản phẩm</p>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="1"
                                        value={1}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                    <label htmlFor="1"> Dưới 100.000 đ</label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="2"
                                        value={2}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                    <label htmlFor="2">
                                        {" "}
                                        100.000 đ - 300.000 đ
                                    </label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="3"
                                        value={3}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                    <label htmlFor="3">
                                        {" "}
                                        300.000 đ - 500.000 đ
                                    </label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        name="price"
                                        id="4"
                                        value={4}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                    <label htmlFor="4"> Trên 500.000 đ</label>
                                    <br></br>
                                </div>
                                <div className="filter-button">
                                    <input
                                        type="button"
                                        value="Áp dụng"
                                        onClick={handleFilter}
                                    />
                                </div>
                            </form>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
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
            <MessengerComponent />
            <Footer />
        </div>
    );
}

export default Products;
