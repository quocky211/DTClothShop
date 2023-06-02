import React, { useState, useEffect } from "react";
import "./NewTypeProduct.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

import ProductDataService from "../../../services/products";
import CatagoryDataService from "../../../services/catagories";

export default function NewTypeProduct() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);
  const [catas, setCatas] = useState([]);
  const [cataId, setCataId] = useState(1);
  const [cataDetail, setCataDetail] = useState([]);

  const [categoryDetailId, setCategoryDetailId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [material, setMaterial] = useState("");
  const [description, setDesciption] = useState("");


  useEffect(() => {
    getCatas();
  }, [cataId]);

  const getCatas = () => {
    CatagoryDataService.getAll()
      .then(function (res) {
        getCataDetail();
        setCatas(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCataDetail = () => {
    CatagoryDataService.getAllDetail(cataId)
      .then(function (res) {
        setCataDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCata = (e) => {
    setCataId(e.target.value);
  };
  const handleCataDetail = (e) => {
    setCategoryDetailId(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    let newProduct = {
      category_id: cataId,
      category_detail_id: categoryDetailId,
      name: name,
      description: description,
      price: price,
      discount: discount,
      marterial: material,
    };
    ProductDataService.createProducts(newProduct)
      .then((response) => {
        alert("Thêm mới sản phẩm thành công")
        navigate("/Admin/TypeProducts");
      })
      .catch((e) => {
        alert("Thêm không thành công")
        console.log(e);
      });
  };
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
              <input
                type="text"
                placeholder="Áo thun DTCloth"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="newTypeProductItem">
              <label>Danh mục</label>
              <select onChange={(e) => handleCata(e)}>
                {catas.map(function (item) {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="newTypeProductItem">
              <label>Loại</label>
              <select onChange={(e) => handleCataDetail(e)}>
                {cataDetail.map(function (item) {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="newTypeProductItem">
              <label>Chất liệu</label>
              <input
                type="text"
                placeholder="Vải Cotton"
                onChange={(e) => setMaterial(e.target.value)}
              />
            </div>
            <div className="newTypeProductItem">
              <label>Giá</label>
              <input
                type="text"
                placeholder="100.000đ"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="newTypeProductItem">
              <label>Tỉ lệ giảm giá</label>
              <input
                type="text"
                placeholder="15%"
                onChange={(e) => setDiscount(e.target.value / 100)}
              />
            </div>
            <div className="newTypeProductItem">
              <label>Mô tả</label>
              <textarea
                cols="10"
                rows="5"
                onChange={(e) => setDesciption(e.target.value)}
              ></textarea>
            </div>
            <button
              className="newTypeProductButton"
              onClick={(e) => handleCreate(e)}
            >
              Tạo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
