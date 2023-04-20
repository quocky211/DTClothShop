import React from 'react'
import './NewProduct.css';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

export default function NewProduct() {
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="newProduct">
        <h1 className="newProductTitle">Thêm sản phẩm</h1>
          <form className="newProductForm">
            <div className="newProductItem">
              <label>Image</label>
              <input type="file" id="file" />
            </div>
            <div className="newProductItem">
              <label>Tên sản phẩm</label>
              <input type="text" placeholder="Áo thun DTCloth" />
            </div>
            <div className="newProductItem">
              <label>Danh mục</label>
              <select>
                <option value="">Áo</option>
                <option value="">Quần</option>
                <option value="">Phụ kiện</option>
              </select>
            </div>
            <div className="newProductItem">
              <label>Loại</label>
              <select>
                <option value="">Áo thun</option>
                <option value="">Áo khoác</option>
                <option value="">Áo sơ mi</option>
                <option value="">Áo polo</option>
              </select>
            </div>
            <div className="newProductItem">
              <label>Màu sắc</label>
              <input type="text" placeholder="Xanh" />
            </div>
            <div className="newProductItem">
              <label>Size</label>
              <input type="text" placeholder="40" />
            </div>
            <div className="newProductItem">
              <label>Giá</label>
              <input type="text" placeholder="100.000đ" />
            </div>
            <div className="newProductItem">
              <label>Số lượng</label>
              <input type="text" placeholder="100" />
            </div>
            <button className="newProductButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
