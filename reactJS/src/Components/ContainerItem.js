import React from "react";
import "./ContainerItem.css";
import { AddCart } from "../actions";
import { connect } from "react-redux";
import whiteplus from "./Images/whiteplus.jpg";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ContainerItem(props) {
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const priceVND = vnd.format(props.price);
  const item = {
    _id: props._id,// đổi masp thành _id
    price: props.price,
    name: props.name,
    image: props.image,
  };

  const [open, setOpen] = React.useState(false);

  // var linkProduct = "/Products/" + props.masp;
  var linkCart = "/Login";
  if (props.isLoggedin) {
    linkCart = "/ShoppingCart";
  }

  const handleClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };
  const refresh = () => {
    window.location.refresh();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="containerItem">
      {/* <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Thêm vào giỏ hàng thành công!
        </Alert>
      </Snackbar> */}
      {/* // masp ở đây là cái éo gì mà đổi sang _id lại không chạyyyy */}
      <Link to={"/Products/" + props.masp}>
        <button onClick={() => refresh()}>
          <img src={props.image} alt="sanpham" className="ContainerItem_image" />
          <div className="nameandprice">
            <p className="containerItem_name">{props.name}</p>
            <p className="containerItem_infor-price">{priceVND}</p>
          </div>
        </button>
      </Link>
      {/* <div className="containerItem_infor">
        <div className="add-buy-btn">
          <Link to={linkCart}>
            <button className="buy-btn" onClick={() => props.AddCart(item)}>
              Mua ngay
            </button>
          </Link>
          <button
            className="btn-addcart"
            onClick={() => {
              handleClose();
              handleClick();
              props.AddCart(item);
            }}
          >
            {" "}
            <img src={whiteplus} alt="" />
          </button>
        </div>
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    _products: state._todoProduct,
    isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    AddCart: (item) => dispatch(AddCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerItem);
