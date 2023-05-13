import "./Shopping.css";
import React, { useEffect } from "react";
import { NavLink as Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
// import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from "../../actions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { useDispatch, useSelector } from "react-redux";
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
    // let ListCart = [];
    // let TotalCart = 0;

    // Object.keys(items.Carts).forEach(function (item) {
    //     TotalCart += items.Carts[item].quantity * items.Carts[item].price;
    //     ListCart.push(items.Carts[item]);
    // });
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

    // const handleClearCart = (item) => {
    //     dispatch(clearCart());
    // };

    return (
        <div className="main">
            <Header />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
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
                                        <th>Màu sắc</th>
                                        <th>Kích thước</th>
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

                                                <td>{item.name}</td>
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
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
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
                            <NavLink
                                to="/ShipAddress"
                                state={{ data: cart.cartTotalAmount }}
                            >
                                <button className="shopping-buy-btn">
                                    Mua hàng
                                </button>
                            </NavLink>
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
        // items: state._todoProduct,
    };
};

// export default connect(mapStateToProps, {
//     IncreaseQuantity,
//     DecreaseQuantity,
//     DeleteCart,
// })(Shopping);
export default Shopping;
