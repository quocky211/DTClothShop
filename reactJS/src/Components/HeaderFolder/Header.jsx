import React from "react";
import "./Header.css";
import shoppingIcon from "../Images/shopping-icon.png";
import Searchbar from "../Search/Searchbar";
import { Log_out } from "../../actions";
import { useNavigate } from "react-router-dom";
import { FakeData } from "../fakedata";
import ListTypeProduct from "../ListTypeProduct/ListTypeProduct";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  let navigate = useNavigate();
  var loveList = "/Login"
  var loginButtonText = "Đăng nhập";
  if (props.isLoggedin) {
    loveList = "/LoveProducts"
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
            <div className="product-header">
              <Nav.Link href="/Products" >Sản phẩm</Nav.Link>
              <ul className="type-product">
                {
                  FakeData[2].map( (item) => (<ListTypeProduct matype={item.matype} name={item.name}/>))
                }
              </ul>
            </div>
          <Nav.Link href="/Outfits">Bộ phối</Nav.Link>
          <Nav.Link href="/AboutUs">Giới thiệu</Nav.Link>
          <Nav.Link href="/Blogs">Bài viết</Nav.Link>
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
        <Nav.Link href={loveList}> Sản phẩm yêu thích </Nav.Link>
        <Nav.Link href="/ShoppingCart">
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

