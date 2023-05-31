import React, { useState, useEffect } from "react";
import CatagoryDataService from "../../services/catagories";
import "./Header.css";
import shoppingIcon from "../Images/shopping-icon.png";
import Logo from "../Images/logo-pj.jpg";
import { useNavigate } from "react-router-dom";
import ListTypeProduct from "../ListTypeProduct/ListTypeProduct";
import ListTypeProductMobile from "../ListTypeProductMobile/ListTypeProductMobile";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import usericon from "../Images/user-icon.png";
import sidebaricon from "../Images/sidebar-icon.png";
import searchicon from "../Images/black-search-icon.png";
import close from "../Images/close.webp";
import arrowbottom from "../Images/arrow-bottom.png";

import { useSelector, useDispatch } from "react-redux";
import { getToTals } from "../../redux/cartSlide";
import { logout } from "../../redux/credentials";

function Header(props) {
  const tokens = JSON.parse(localStorage.getItem("JWT"));

  let navigate = useNavigate();
  var loveList = "/FavoriteProduct";
  if (window.localStorage.getItem("Email") == null) {
    loveList = "/Login";
  }

  function LoginclickHandler() {
    if (!tokens) {
      navigate("/Login");
    }
  }

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToTals());
  }, [cart, dispatch]);

  const [catagories, setCategories] = useState([]);
  useEffect(() => {
    CatagoryDataService.getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate("/Search", {
      state: {
        search,
      },
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/Search", {
        state: {
          search,
        },
      });
    }
  };

  const Logout = (e) => {
    window.localStorage.removeItem("JWT");
    window.localStorage.removeItem("Email");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("refreshToken");

    navigate("/Login");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
    >
      <Container fluid>
        <div className="sidebar-icon">
          <label htmlFor="nav-mobile-input">
            <img
              src={sidebaricon}
              alt="sidebaricon"
            />
          </label>
          <label
            htmlFor="search-input"
            className="searchicon"
          >
            <img
              src={searchicon}
              alt="searchicon"
            />
          </label>
        </div>
        <input
          type="checkbox"
          name=""
          className="nav-mobile-input"
          id="nav-mobile-input"
        />
        <label
          htmlFor="nav-mobile-input"
          className="nav_overlay"
        ></label>
        <input
          type="checkbox"
          name=""
          className="search-input"
          id="search-input"
        />
        <label
          htmlFor="search-input"
          className="nav_overlay1"
        ></label>
        <div className="nav-mobile">
          <label
            htmlFor="nav-mobile-input"
            className="nav-mobile-close"
          >
            <img
              src={close}
              alt="close"
            />
          </label>
          <ul className="nav-mobile-list">
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <hr />
            <div className="mobile-product">
              <Nav.Link href="/Products">Sản phẩm</Nav.Link>
              <label htmlFor="product-list-mobile">
                <img
                  src={arrowbottom}
                  alt="arrowbottom"
                />
              </label>
            </div>
            <input
              type="checkbox"
              className="product-list-mobile"
              id="product-list-mobile"
            />
            <ul className="type-mobile-product">
              {catagories.map((item) => (
                <ListTypeProductMobile
                  _id={item._id}
                  name={item.name}
                />
              ))}
            </ul>
            <hr />
            <Nav.Link href="/Outfits">Bộ phối</Nav.Link>
            <hr />
            <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
            <hr />
            <Nav.Link href="/Blogs">Bài viết</Nav.Link>
            <hr />
            <Nav.Link href={loveList}> Sản phẩm yêu thích </Nav.Link>
          </ul>
        </div>
        <div className="nav-mobile-search">
          <label
            htmlFor="search-input"
            className="nav-mobile-close"
          >
            <img
              src={close}
              alt="close"
            />
          </label>
          <Form className="mobile-search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline-success"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </div>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="Shop quần áo"
            className="Logo"
          />
        </Navbar.Brand>
        <Nav
          className=""
          style={{ maxHeight: "100px" }}
        >
          <Nav.Link href="/">Trang chủ</Nav.Link>
          <div className="product-header">
            <Nav.Link href="/Products">Sản phẩm</Nav.Link>
            <ul className="type-product">
              {catagories.map((item) => (
                <ListTypeProduct
                  _id={item._id}
                  name={item.name}
                />
              ))}
            </ul>
          </div>
          <Nav.Link href="/Outfits">Bộ phối</Nav.Link>
          <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
          <Nav.Link href="/Blogs">Bài viết</Nav.Link>
        </Nav>
        <Form className="search">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outline-success"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Form>
        <Nav.Link
          className="lovelists"
          href={loveList}
        >
          {" "}
          Sản phẩm yêu thích{" "}
        </Nav.Link>
        <div className="cartandlogin">
          <Nav.Link href="/ShoppingCart">
            <img
              src={shoppingIcon}
              alt="cart"
            />
            <span>{cart.cartTotalQuantity}</span>
          </Nav.Link>
          <button
            onClick={LoginclickHandler}
            className="logIn-btn"
          >
            <Nav.Link>
              <img
                src={usericon}
                alt="User-icon"
              />{" "}
            </Nav.Link>
            {tokens != null && (
              <ul className="list-infor-user">
                <Nav.Link href="/Account">
                  {" "}
                  <li>Thông tin tài khoản</li>{" "}
                </Nav.Link>
                <button
                  className="nav-link"
                  onClick={Logout}
                >
                  {" "}
                  <li>Đăng xuất</li>{" "}
                </button>
              </ul>
            )}
          </button>
        </div>
      </Container>
    </Navbar>
  );
}
const mapStateToProps = (state) => {
  return {
    // numberCart: state._todoProduct.numberCart,
    // isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
