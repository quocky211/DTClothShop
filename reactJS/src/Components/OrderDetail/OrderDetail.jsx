import React from 'react'
import "./OrderDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { Link } from 'react-router-dom';
import ao from "../Images/fakedata/ao1.jpg";

export default function OrderDetail() {
  return (
    <div>
        <Header/>
        <div className="orderDetails">
            <div className="orderInfor">
                <div className="orderInforItem">
                    <span className="orderInfortitle">Thông tin giao hàng </span>
                    <div className="orderInforDetail">
                        <p>Nguyễn Quốc Kỳ</p>
                        <p>Địa chỉ: Phú Hòa, Mỹ Đức, Phù Mỹ, Bình Định</p>
                        <p>SDT: 097 238 9256 </p>
                    </div>
                </div>
                <div className="orderInforItem">
                    <span className="orderInfortitle">Thông tin thanh toán </span>
                    <div className="orderInforDetail">
                        <p>Thanh toán bằng thẻ ATM</p>
                        <p className='success'>Thanh toán thành công</p>
                    </div>
                </div>
                <div className="orderInforItem">
                    <div className="orderInfortitle">Thông báo </div>
                    <div className="orderInforDetail">
                        <p className='success'>Giao hàng thành công</p>
                    </div>
                </div>
            </div>
            <div className="orderProducts">
                <table className='orderProductsTable'>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th> Giá </th>
                            <th> Số lượng </th>
                            <th> Giảm giá</th>
                            <th> Tạm tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="orderProductItem">
                                    <img src={ao} alt="Img" />
                                    <div className="orderProductInfor">
                                        <p>Áo thun đến từ đại dương</p>
                                        <p>
                                            <span>Màu:</span>

                                        </p>
                                        <p>
                                            <span>Size:</span>
                                        </p>
                                        <Link>
                                            <button>Xem chi tiết</button>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                            <td>330.000đ</td>
                            <td>1</td>
                            <td>0đ</td>
                            <td>330.000đ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
