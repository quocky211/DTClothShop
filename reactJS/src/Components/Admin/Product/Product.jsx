import React from "react";
import "./Product.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";
import { productData } from "../dummyData";
import ao from "../Images/ao1.jpg";
import { Publish } from "@mui/icons-material";
export default function Product() {
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Sản phẩm</h1>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart
                data={productData}
                dataKey="Sales"
                title="Sale Performance"
              />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={ao} alt="" className="productInfoImg" />
                <span className="productName">T-Shirt DTCloth</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">123</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Loại</span>
                  <span className="productInfoValue">Áo thun</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Màu sắc:</span>
                  <span className="productInfoValue">Xanh</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Size:</span>
                  <span className="productInfoValue">38</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Giá:</span>
                  <span className="productInfoValue">100.000đ</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Số lượng còn lại:</span>
                  <span className="productInfoValue">80</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <div className="productFormItem">
                  <label>Tên sản phẩm</label>
                  <input type="text" placeholder="Áo thun" />
                </div>
                <div className="productFormItem">
                  <label>Loại</label>
                  <select>
                    <option value="ao">Áo thun</option>
                    <option value="quan">Áo khoác</option>
                    <option value="pk">Áo sơ mi</option>
                    <option value="pk">Áo polo</option>
                  </select>
                </div>
                <div className="productFormItem">
                  <label>Màu sắc</label>
                  <input type="text" placeholder="Xanh" />
                </div>
                <div className="productFormItem">
                  <label>Size</label>
                  <input type="text" placeholder="38" />
                </div>
                <div className="productFormItem">
                  <label>Giá</label>
                  <input type="text" placeholder="100" />
                </div>
                <div className="productFormItem">
                  <label>Số lượng còn lại </label>
                  <input type="text" placeholder="80" />
                </div>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={ao} alt="" className="productUploadImg" />
                  <label for="file">
                    <Publish style={{ cursor: "pointer" }} />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
