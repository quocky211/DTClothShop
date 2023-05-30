import "./Shopping.css";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";

import {
    decreaseCart,
    increaseCart,
    getToTals,
    removefromCart,
    clearCart,
} from "../../redux/cartSlide";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Shopping() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getToTals());
    }, [cart, dispatch]);

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

    const handleRemoveFromCart = (item) => {
        dispatch(removefromCart(item));
        setOpen(true);
    };

    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item));
    };

    const handleIncreaseCart = (item) => {
        dispatch(increaseCart(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="main">
            <Header />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main-container">
                <div className="products">
                    <div className="cart-heading grid grid-five-column">
                        <p>Sản phẩm</p>
                        <p className="cart-hide">Giá</p>
                        <p>Số lượng</p>
                        <p className="cart-hide">Tổng tiền</p>
                        <p>Xóa</p>
                    </div>
                    <hr />
                    <div className="cart-item">
                        {cart.cartItems?.map((item) => {
                            return (
                                <div className="grid grid-five-column">
                                    <div className="cart-image-name">
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: 125,
                                                    height: 100,
                                                }}
                                            ></img>
                                        </div>
                                        <div>
                                            <p>{item.name}</p>
                                            <div className="color-div">
                                                <p>Color:</p>
                                                <div
                                                    className="color-style"
                                                    style={{
                                                        backgroundColor:
                                                            item.color,
                                                        color: item.color,
                                                    }}
                                                ></div>
                                                <span>,</span>
                                                <p>{item.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-hide">
                                        <p>
                                            {Number(item.price).toLocaleString(
                                                "vi-VN"
                                            )}{" "}
                                            <span>đ</span>
                                        </p>
                                    </div>
                                    <div className="cart-btn-quantity">
                                        <span
                                            className="btn-quantity"
                                            style={{ margin: "2px" }}
                                            onClick={() =>
                                                handleDecreaseCart(item)
                                            }
                                        >
                                            -{" "}
                                        </span>
                                        <span>{item.quantity}</span>
                                        <span
                                            className="btn-quantity"
                                            style={{ margin: "2px" }}
                                            onClick={() =>
                                                handleIncreaseCart(item)
                                            }
                                        >
                                            {" "}
                                            +{" "}
                                        </span>
                                    </div>
                                    <div className="cart-hide">
                                        {TotalPrice(item.quantity, item.price)}{" "}
                                        <span>đ</span>
                                    </div>
                                    <div>
                                        <DeleteOutline
                                            className="delete-btn"
                                            onClick={() =>
                                                handleRemoveFromCart(item)
                                            }
                                        ></DeleteOutline>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className="cart-two-button">
                        <button
                            className="btn-clear"
                            onClick={() => {
                                handleClearCart();
                            }}
                        >
                            Xóa giỏ hàng
                        </button>
                        <NavLink
                            to="/ShipAddress"
                            state={{ data: cart.cartTotalAmount }}
                        >
                            <button className="btn-pay">
                                {"Mua hàng"}
                                <br />
                                {"("}
                                {Number(cart.cartTotalAmount).toLocaleString(
                                    "vi-VN"
                                )}{" "}
                                <span>đ</span>
                                {")"}
                            </button>
                        </NavLink>
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

export default Shopping;
