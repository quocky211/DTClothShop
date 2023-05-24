import React from "react";
import { useDispatch } from "react-redux";
import {
    decreaseCart,
    increaseCart,
    removefromCart,
} from "../../redux/cartSlide";

const CartItem = (item) => {

    const dispatch = useDispatch();

    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString("vi-VN");
    }
    const handleRemoveFromCart = (item) => {
        dispatch(removefromCart(item));
    };

    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item));
    };

    const handleIncreaseCart = (item) => {
        dispatch(increaseCart(item));
    };

    return (
        <div className="cart-heading grid grid-five-column">
            <div className="cart-image-name">
                <div>
                    <figure>
                        <image
                            src={"../imgs/" + item.image}
                            alt={item.name}
                        ></image>
                    </figure>
                </div>
                <div>
                    <p>{item.name}</p>
                    <div className="color-div">
                        <p>Color:</p>
                        <div
                            className="color-style"
                            style={{
                                backgroundColor: item.color,
                                color: item.color,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="cart-hide">
                <p>
                    {Number(item.price).toLocaleString("vi-VN")} <span>đ</span>
                </p>
            </div>
            <div className="cart-btn-quantity">
                <span
                    style={{ margin: "2px" }}
                    onClick={() => handleDecreaseCart(item)}
                >
                    {" "}
                    -{" "}
                </span>
                <span>{item.quantity}</span>
                <span
                    style={{ margin: "2px" }}
                    onClick={() => handleIncreaseCart(item)}
                >
                    {" "}
                    -{" "}
                </span>
            </div>
            <div className="cart-hide">
                {TotalPrice(item.quantity, item.price)} <span>đ</span>
            </div>
            <div>
                <img src="../Images/icon/trashicon.png" alt="removeItem" onClick={()=> handleRemoveFromCart(item)} />
            </div>
        </div>
    );
};

export default CartItem;
