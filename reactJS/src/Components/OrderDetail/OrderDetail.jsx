import React, {useState, useEffect} from "react";
import "./OrderDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { Link, useParams, useLocation } from "react-router-dom";
import OrderDataService from "../../services/orders";
export default function OrderDetail() {

  const { orderID } = useParams();
  const [ order, setOrder ] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getOrderDetail();
  },[])

  const getOrderDetail = () =>{
    OrderDataService.getOrderDetail(orderID)
    .then((res) =>{
      console.log(res.data[0])
      setOrder(res.data[0])
    })
    .catch((err) =>console.log(err));
  }

  return (
    <div>
      <Header />
      <div className="orderDetails">
        <div className="orderInfor">
          <div className="orderInforItem">
            <span className="orderInfortitle">Thông tin giao hàng </span>
            <div className="orderInforDetail">
              <p>Nguyễn Quốc Kỳ</p>
              <p>Địa chỉ:{location.state.order.address}</p>
              <p>SDT: <span>{location.state.order.phone}</span> </p>
            </div>
          </div>
          <div className="orderInforItem">
            <span className="orderInfortitle">Thông tin thanh toán </span>
            <div className="orderInforDetail">
              <p>{location.state.order.pay_method}</p>
              <p className="success">Thanh toán thành công</p>
            </div>
          </div>
          <div className="orderInforItem">
            <div className="orderInfortitle">Thông báo </div>
            <div className="orderInforDetail">
              <p className="success">{location.state.order.status}</p>
            </div>
          </div>
        </div>
        <div className="orderProducts">
          <table className="orderProductsTable">
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
                    <img src=" " alt="Img" />
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
          <div className="orderProductsTable-Mobile">
            <div className="orderItem-Mobile">
              <img src=" " alt="img" />
              <div className="orderProduct-Mobile">
                <p>Áo thun đến từ đại dương</p>
                <p>
                  <span>Màu: </span>
                  <span
                    className=""
                    style={{ background: "black", padding: "2px 7px" }}
                  ></span>
                  <span> | Size:</span>
                  36
                </p>
                <p>
                  <span>Số lượng: </span>{1}
                  <span> | Giá: </span>330.000đ
                </p>
              </div>
              <div className="buttonDetail">
                <Link>
                  <button> Xem chi tiết </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
