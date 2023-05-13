import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    // cartItems: localStorage.getItem("cartItems")
    //     ? JSON.parse(localStorage.getItem("cartItems"))
    //     : [],
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    quantity:
                        state.cartItems[existingIndex].quantity + action.payload.quantity,
                };
            } else {
                let tempProductItem = { ...action.payload };
                state.cartItems.push(tempProductItem);
            }
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
                toast.info("Giảm số lượng sản phẩm thành công!", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].quantity === 1) {
                const nextCartItem = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );
                state.cartItems = nextCartItem;
                toast.error("Đã xóa sản phẩm khỏi giỏ hàng!", {
                    position: "bottom-left",
                });
            }
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        increaseCart: (state, action) => {
            const indexItem = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            state.cartItems[indexItem].quantity += 1;

            // if (state.cartItems[indexItem].cartQuantity < action.payload.qty) {
            // } else {s
            //     toast.error("Không thể thêm sản phẩm vì số lượng có hạn!", {
            //         position: "bottom-left",
            //     });
            // }
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removefromCart: (state, action) => {
            state.cartItems.map((cartItem) => {
                if (cartItem._id === action.payload._id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item._id !== cartItem._id
                    );
                    state.cartItems = nextCartItems;
                }
                // localStorage.setItem(
                //     "cartItems",
                //     JSON.stringify(state.cartItems)
                // );
                return state;
            });
        },

        getToTals: (state) => {
            let { total, cartQuantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.cartQuantity += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    cartQuantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = cartQuantity;
            state.cartTotalAmount = total;
        },

        clearCart: (state, action) => {
            state.cartItems = [];
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Đã xóa toàn bộ giỏ hàng!", {
                position: "bottom-left",
            });
        },
    },
});

export const {
    addToCart,
    decreaseCart,
    increaseCart,
    removefromCart,
    getToTals,
    clearCart,
} = cartSlide.actions;

export const cartReducer = cartSlide.reducer;
