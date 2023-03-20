import { Component } from "react";
import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../Images/logo.webp";
import shoppingIcon from "../Images/shopping-icon.png";
import { NavLink as Link, NavLink } from "react-router-dom";
import Searchbar from "../Search/Searchbar";
import { Log_out } from "../../actions";
import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../LoginFolder/Login";
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { colors } from "react-select/dist/declarations/src/theme";

function Header(props) {
  let navigate = useNavigate();
  var linkCart = "/Login";
  var loginButtonText = "Đăng nhập";
  if (props.isLoggedin) {
    linkCart = "/ShoppingCart";
    loginButtonText = "Đăng xuất";
  }
  function LoginclickHandler() {
    if (props.isLoggedin) {
      props.Log_out();
      navigate("/");
    } else {
      navigate("/Login");
    }
  }
  return (
    // <div className="header">
    //   <div className="header-left">
    //     <Link to="/">
    //       <img src={logo} alt="logo" />
    //       <h2>TechieShop</h2>
    //     </Link>
    //   </div>

    //   <div className="header-nav_menu">
    //     <button>
    //       <NavLink to="/MainPage">Trang chủ</NavLink>
    //     </button>
    //     <button>
    //       <NavLink to="/Products">Sản phẩm</NavLink>
    //     </button>
    //     <button>
    //       <NavLink to="/AboutUs">Giới thiệu</NavLink>
    //     </button>
    //   </div>

    //   <Searchbar />

    //   <div className="header-right">
    //     <div className="header-right_item">
    //       <Link to={linkCart}>
    //         <img src={shoppingIcon} alt="cart" />
    //         <span>{props.numberCart}</span>
    //       </Link>
    //       <button onClick={LoginclickHandler} className="logIn-btn">
            // {loginButtonText}
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
      <Navbar.Brand href="/">Shop quần áo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
          <Nav
          className="me-auto my-2 my-lg-0 "
          style={{ maxHeight: '100px'}}
        >
          <Nav.Link href="/">Trang chủ</Nav.Link>
          {/* <NavDropdown title="Sản phẩm" id="navbarScrollingDropdown" className="product-nav">
            <NavDropdown title="Áo" className="product-nav-list">
              <NavDropdown.Item>Áo thun</NavDropdown.Item>
              <NavDropdown.Item>Áo khoác</NavDropdown.Item>
              <NavDropdown.Item>Áo polo</NavDropdown.Item>
              <NavDropdown.Item>Áo sơ mi</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Quần" href="#action4" className="product-nav-list">
              <NavDropdown.Item>Váy</NavDropdown.Item>
              <NavDropdown.Item>Quần ngắn</NavDropdown.Item>
              <NavDropdown.Item>Quần jean</NavDropdown.Item>
              <NavDropdown.Item>Quần kaki</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Phụ kiện" href="#action5" className="product-nav-list">
              <NavDropdown.Item>Túi xách</NavDropdown.Item>
              <NavDropdown.Item>Nón</NavDropdown.Item>
              <NavDropdown.Item>Balo</NavDropdown.Item>
              <NavDropdown.Item>Thắt lưng</NavDropdown.Item>
              <NavDropdown.Item>Ví </NavDropdown.Item>
              <NavDropdown.Item>Vớ</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown> */}
            <div className="product-header">
              <Nav.Link href="/Products" >Sản phẩm</Nav.Link>
              <ul className="type-product">
                <li className="each-type-product">
                      Áo
                  <ul className="detail-product">
                    <li>Áo thun</li>
                    <li>Áo khoác</li>
                    <li>Áo polo</li>
                    <li>Áo sơ mi</li>
                  </ul>
                </li>
                <li className="each-type-product">
                  Quần
                  <ul className="detail-product">
                    <li>Váy</li>
                    <li>Quần ngắn</li>
                    <li>Quần jean</li>
                    <li>Quần kaki</li>
                  </ul>
                </li>
                <li className="each-type-product">
                  Phụ kiện
                  <ul className="detail-product">
                    <li>Nón</li>
                    <li>Balo</li>
                    <li>Thắt lưng</li>
                    <li>Ví</li>
                  </ul>
                </li>
              </ul>
            </div>
          <Nav.Link href="#action2">Bộ siêu tập</Nav.Link>
          <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
          <Nav.Link href="#action2">Blog</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav.Link>
            <img src={shoppingIcon} alt="cart" />
            <span>{props.numberCart}</span>
        </Nav.Link>
        <Nav.Link>
        <button onClick={LoginclickHandler} className="logIn-btn">
           {loginButtonText}
         </button>
        </Nav.Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
const mapStateToProps = (state) => {
  return {
    numberCart: state._todoProduct.numberCart,
    isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    Log_out: () => dispatch(Log_out()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

