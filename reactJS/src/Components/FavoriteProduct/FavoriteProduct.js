import "./FavoriteProduct.css";
import React from "react";
import { NavLink as Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from "../../actions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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

  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].price;
    ListCart.push(items.Carts[item]);
  });
  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString("vi-VN");
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="main">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Sản phẩm yêu thích</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-container">
        <div className="products">
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên sản phẩm</th>
                    <th>Hình</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody style={{ lineHeight: "85px" }}>
                  {ListCart.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <i
                            className="badge badge-danger"
                            onClick={() => {
                              DeleteCart(key);
                              handleClick();
                            }}
                          >
                            X
                          </i>
                        </td>

                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            style={{ width: "100px", height: "80px" }}
                          />
                        </td>
                        <td>
                          {Number(item.price).toLocaleString("vi-VN")}{" "}
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
    </div>
  );
}
const mapStateToProps = (state) => {
  //  console.log(state)
  return {
    items: state._todoProduct,
  };
};

export default connect(mapStateToProps, {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
})(Shopping);
