import React, { useState, useEffect } from "react";
import "./ContainerItem.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ProductDataService from "../services/products";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ContainerItem(props) {
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const priceVND = vnd.format(props.price);

  const [open, setOpen] = useState(false);
  const [CommentsCountAndAvgRatingStar, setCommentsCountAndAvgRatingStar] = useState();

  useEffect(() => {
    retrieveCommentsCountAndAvgRatingStar();
  }, []);

  const retrieveCommentsCountAndAvgRatingStar = () => {
    ProductDataService.getCommentCountAndAvgRating(props.masp)
      .then((res) => {
        console.log(res.data);
        setCommentsCountAndAvgRatingStar(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
  };


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
      <Link to={"/Products/" + props.masp} state={{ image: props.image }}>
        <button>
          <img
            src={props.image}
            alt="sanpham"
            className="ContainerItem_image"
          />
          <div className="nameandprice">
            <p className="containerItem_name">{props.name}</p>
            <p className="containerItem_infor-price">
              <span className="containerItem_price">
                {priceVND}  
              </span>
              
              <span className="containerItem_reviews_AvgRating">
                <span
                  style={{
                    cursor: "pointer",
                    color: "gold",
                    fontSize: "19px",
                  }}
                >
                  &#9733;
                </span>&nbsp;
                {(CommentsCountAndAvgRatingStar !== undefined && CommentsCountAndAvgRatingStar.avgStar) ?  CommentsCountAndAvgRatingStar.avgStar : 0}
                &nbsp;|&nbsp;
                {(CommentsCountAndAvgRatingStar !== undefined && CommentsCountAndAvgRatingStar.qtyCmt) ?  CommentsCountAndAvgRatingStar.qtyCmt : 0} đánh giá
              </span>
            </p>
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
    // _products: state._todoProduct,
    // isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    // AddCart: (item) => dispatch(AddCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerItem);
