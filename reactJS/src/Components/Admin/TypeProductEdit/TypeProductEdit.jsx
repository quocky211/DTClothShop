import React from "react";
import "./TypeProductEdit.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Chart from "../Chart/Chart";
import { typeProductData } from "../dummyData";
import ao from "../Images/ao1.jpg";
import { Publish } from "@mui/icons-material";
export default function TypeProductEdit() {
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="typeProductEdit">
          <div className="typeProductTitleContainer">
            <h1 className="typeProductTitle">Sản phẩm</h1>
          </div>
          <div className="typeProductTop">
            <div className="typeProductTopLeft">
              <Chart
                data={typeProductData}
                dataKey="Sales"
                title="Sale Performance"
              />
            </div>
            <div className="typeProductTopRight">
              <div className="typeProductInfoTop">
                <img src={ao} alt="" className="typeProductInfoImg" />
                <span className="typeProductName">T-Shirt DTCloth</span>
              </div>
              <div className="typeProductInfoBottom">
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">id:</span>
                  <span className="typeProductInfoValue">123</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Loại</span>
                  <span className="typeProductInfoValue">Áo thun</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Chất liệu:</span>
                  <span className="typeProductInfoValue">Vải cotton</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Giá:</span>
                  <span className="typeProductInfoValue">100.000đ</span>
                </div>
                <div className="typeProductInfoItem">
                  <span className="typeProductInfoKey">Tổng số lượng:</span>
                  <span className="typeProductInfoValue">800</span>
                </div>
              </div>
            </div>
          </div>
          <div className="typeProductBottom">
            <form className="typeProductForm">
              <div className="typeProductFormLeft">
                <div className="typeProductFormItem">
                  <label>Tên sản phẩm</label>
                  <input type="text" placeholder="Áo thun" />
                </div>
                <div className="typeProductFormItem">
                  <label>Loại</label>
                  <select>
                    <option value="ao">Áo thun</option>
                    <option value="quan">Áo khoác</option>
                    <option value="pk">Áo sơ mi</option>
                    <option value="pk">Áo polo</option>
                  </select>
                </div>
                <div className="typeProductFormItem">
                  <label>Chất liệu</label>
                  <input type="text" placeholder="Vải cotton" />
                </div>
                <div className="typeProductFormItem">
                  <label>Giá</label>
                  <input type="text" placeholder="100" />
                </div>
                <div className="typeProductFormItem">
                  <label>Tổng số lượng còn lại </label>
                  <input type="text" placeholder="80" />
                </div>
                <div className="typeProductFormItem">
                  <label>Mô tả</label>
                  <textarea cols="10" rows="5" placeholder="Sản phẩm theo phong cách..."></textarea>
                </div>
              </div>
              <div className="typeProductFormRight">
                <button className="typeProductButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
