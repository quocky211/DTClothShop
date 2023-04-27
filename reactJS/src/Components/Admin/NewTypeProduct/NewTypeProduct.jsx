import React from "react";
import "./NewTypeProduct.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
export default function NewTypeProduct() {
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="newTypeProduct">
          <h1 className="newTypeProductTitle">Thêm sản phẩm</h1>
          <form className="newTypeProductForm">
            <div className="newTypeProductItem">
              <label>Tên sản phẩm</label>
              <input type="text" placeholder="Áo thun DTCloth" />
            </div>
            <div className="newTypeProductItem">
              <label>Danh mục</label>
              <select>
                <option value="">Áo</option>
                <option value="">Quần</option>
                <option value="">Phụ kiện</option>
              </select>
            </div>
            <div className="newTypeProductItem">
              <label>Loại</label>
              <select>
                <option value="">Áo thun</option>
                <option value="">Áo khoác</option>
                <option value="">Áo sơ mi</option>
                <option value="">Áo polo</option>
              </select>
            </div>
            <div className="newTypeProductItem">
              <label>Chất liệu</label>
              <input type="text" placeholder="Vải Cotton" />
            </div>
            <div className="newTypeProductItem">
              <label>Giá</label>
              <input type="text" placeholder="100.000đ" />
            </div>
            <div className="newTypeProductItem">
              <label>Mô tả</label>
              <textarea cols="10" rows="5"></textarea>
            </div>
            <button className="newTypeProductButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
