import "./Shopping.css";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { useDispatch, useSelector } from "react-redux";
// import CartItem from "../CartItem/CartItem";
import {DeleteOutline} from "@mui/icons-material";

import {
    decreaseCart,
    increaseCart,
    getToTals,
    removefromCart,
    clearCart,
} from "../../redux/cartSlide";
import { red } from "@mui/material/colors";

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
                    {/* <div className="row">
                        <div className="col-md-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tên sản phẩm</th>
                                        <th>Hình</th>
                                        <th>Giá</th>

                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody style={{ lineHeight: "85px" }}>
                                    {cart.cartItems?.map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <i
                                                        className="badge badge-danger"
                                                        onClick={() => {
                                                            handleRemoveFromCart(
                                                                item
                                                            );
                                                            handleClick();
                                                        }}
                                                    >
                                                        X
                                                    </i>
                                                </td>

                                                <td>{item.name}<br/>{item.size},{item.color}</td>
                                                <td>
                                                    <img
                                                        src={"../imgs/" + item.image}
                                                        alt="img"
                                                        style={{
                                                            width: "100px",
                                                            height: "80px",
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    {Number(
                                                        item.price
                                                    ).toLocaleString(
                                                        "vi-VN"
                                                    )}{" "}
                                                    <span className="underline">
                                                        đ
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className="btn btn-primary"
                                                        style={{
                                                            margin: "2px",
                                                        }}
                                                        onClick={() =>
                                                            handleDecreaseCart(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </span>
                                                    <span className="btn btn-info">
                                                        {item.quantity}
                                                    </span>
                                                    <span
                                                        className="btn btn-primary"
                                                        style={{
                                                            margin: "2px",
                                                        }}
                                                        onClick={() =>
                                                            handleIncreaseCart(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </span>
                                                </td>
                                                <td>
                                                    {TotalPrice(item.quantity, item.price )}{" "}
                                                    <span className="underline">
                                                        đ
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colSpan="5">Tổng tiền giỏ hàng</td>
                                        <td>
                                            {Number(
                                                cart.cartTotalAmount
                                            ).toLocaleString("vi-VN")}{" "}
                                            <span className="underline">đ</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="shopping-clear-btn" onClick={()=> handleClearCart()}>Xóa giỏ hàng</button>
                            <NavLink
                                to="/ShipAddress"
                                state={{ data: cart.cartTotalAmount }}
                            >
                                <button className="shopping-buy-btn">
                                    Mua hàng
                                </button>
                            </NavLink>

                        </div>
                    </div> */}
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
                                                src={
                                                    "../imgs/" +
                                                    item.image
                                                }
                                                alt={item.name}
                                                style={
                                                    {
                                                        // maxWidth:125,
                                                        // maxHeight:100,
                                                        width: 125,
                                                        height: 100,
                                                    }
                                                }
                                            ></img>
                                        </div>
                                        <div>
                                            <p>{item.name}</p>
                                            <div className="color-div">
                                                <p>Color:</p>
                                                <div className="color-style"
                                                style={{backgroundColor: item.color, color: item.color }}></div>
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
                                        <DeleteOutline className="delete-btn" onClick={()=> handleRemoveFromCart(item)}></DeleteOutline>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                    <hr/>
                    <div className="cart-two-button">
                        <button className="btn-clear" onClick={() => {handleClearCart()}}>Xóa giỏ hàng</button>
                    <NavLink
                                to="/ShipAddress"
                                state={{ data: cart.cartTotalAmount }}
                            >
                                <button className="btn-pay">
                                    {"Mua hàng"}<br/>{"("}{Number(
                                                cart.cartTotalAmount
                                            ).toLocaleString("vi-VN")}{" "}
                                            <span>đ</span>{")"}
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
