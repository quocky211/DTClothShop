import "./FavoriteProduct.css";
import React, { useEffect, useState } from "react";
import { NavLink as Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import ProductDataService from "../../services/products";
import { DeleteOutline } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

function Shopping({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {
  let ListCart = [];
  let TotalCart = 0;

  const [listCart, setListCart] = useState([]);

  useEffect(() => {
    const email_user = window.localStorage.getItem("Email");
    if (email_user == null) {
      window.location.href = "/Login";
    } else {
      ProductDataService.getAllFavoriteProduct(email_user)
        .then((res) => {
          setListCart(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [listCart]);

  // Object.keys(items.Carts).forEach(function (item) {
  //   TotalCart += items.Carts[item].quantity * items.Carts[item].price;
  //   ListCart.push(items.Carts[item]);
  // });
  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString("vi-VN");
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const DeleteFavoriteItem = (item) => {
    const product_favorite = {
      email: item.email,
      product_id: item.product_id._id,
    };
    ProductDataService.deleteFavoriteProduct(product_favorite)
      .then((response) => {
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="main">
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Sản phẩm yêu thích</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-container">
        <div className="products">
          <div className="row">
            <div className="col-md-12">
              <table className="table min-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên sản phẩm</th>
                    <th>Hình</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody style={{ lineHeight: "85px" }}>
                  {listCart.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <DeleteOutline
                            className="delete-btn click-pointer"
                            onClick={() => {
                              DeleteFavoriteItem(item);
                              handleClick();
                            }}
                          ></DeleteOutline>
                        </td>

                        <td>
                          <a href={`Products/${item.product_id._id}`}>
                            {item.product_id.name}
                          </a>
                        </td>
                        <td>
                          <img
                            src={item.path}
                            alt=""
                            style={{ width: "100px", height: "80px" }}
                          />
                        </td>
                        <td>
                          {Number(item.product_id.price).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          <span className="underline">đ</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <NavLink
                to="/ShipAddress"
                state={{ data: TotalCart }}
              ></NavLink>
            </div>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Đã bỏ sản phẩm ra khỏi giỏ hàng!
            </Alert>
          </Snackbar>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  //  console.log(state)
  return {
    items: state._todoProduct,
  };
};

export default connect(mapStateToProps, {})(Shopping);
