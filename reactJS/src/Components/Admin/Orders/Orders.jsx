import React, { useState, useEffect } from "react";
import "./Orders.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import OrderDataService from "../../../services/orders";
export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderList();
  }, []);
  const getOrderList = () => {
    OrderDataService.getAllOrders().then((res) => {
      setOrders(res.data);
    });
  };
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="orderList">
          <h2>Quản lý đơn hàng</h2>
          <div className="tableOrderList">
            <table className="orderProductsTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th> Tên khách hàng </th>
                  <th> Địa chỉ </th>
                  <th>Tổng tiền</th>
                  <th>Phương thức thanh toán</th>
                  <th> Tình trạng</th>
                  <th> Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index)=>(
                    <tr>
                        <td>{index}</td>
                        <td>{order.name}</td>
                        <td>{order.address}</td>
                        <td>{Number(order.total).toLocaleString("vi-VN")} đ</td>
                        <td>{order.pay_method}</td>
                        <td>{order.status}</td>
                        <td>{order.createdAt}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
