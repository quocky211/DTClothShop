import "./Payment.css"
import React from "react";

function Payment({ DeleteTorage }) {

    localStorage.removeItem('gio')
    const refreshPage = () => {
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }

    return (
        <div className="main-container-payment">
            <div className="form-payment-container">
                {/* <div className="form-payment">
                    <input type="radio" name="payment" value="cod" id="payment_cod" onClick={() => setVisible(false)}/>Thanh toán khi nhận hàng (COD)
                </div>

                <div className="form-payment">
                    <input type="radio" name="payment" value="bank" id="payment_bank" onClick={() => setVisible(true)}/>Chuyển khoản
                </div>

                {visible && <div className="form-payment_bank">
                    <p>Vietcombank chi nhánh HCM</p>
                    <p>Số tài khoản: 1016956832</p>
                    <p>Tên tài khoản: Nguyễn Quốc Kỳ</p>
                    <p>Nhận viên sẽ gọi điện xác nhận sau khi nhận được chuyển khoản</p>
                    <p>Cảm ơn bạn đã mua sắm tại TechIE Shop</p>
                </div>} */}
               
            </div>
        </div>
    )
}


export default Payment