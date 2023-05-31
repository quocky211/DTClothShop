import React, { useState, useEffect } from "react";
import "./NewProduct.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductDataService from "../../../services/products";

export default function NewProduct() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);
  const { typeProductId } = useParams();

  const [image, setImg] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleCreate = (e) => {
    e.preventDefault();
    let detail = {
      product_id: typeProductId,
      image: image,
      color: color,
      size: size,
      qty: quantity,
    };
    ProductDataService.createDetailProduct(detail)
    .then((response) => {
      alert("Thêm mới chi tiết sản phẩm thành công")
      navigate("/Admin/Products/"+ typeProductId);
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
        <div className="newProduct">
          <h1 className="newProductTitle">Thêm chi tiết sản phẩm</h1>
          <form className="newProductForm">
            <div className="newProductItem">
              <label>Image</label>
              <input type="file" id="file" onChange={(e) => setImg(e.target.files[0].name)} />
            </div>
            <div className="newProductItem">
              <label>Màu sắc</label>
              <input type="text" placeholder="Xanh" onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="newProductItem">
              <label>Size</label>
              <input type="text" placeholder="40" onChange={(e) => setSize(e.target.value)}/>
            </div>
            <div className="newProductItem">
              <label>Số lượng</label>
              <input type="text" placeholder="100" onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <button
              className="newProductButton"
              onClick={(e) => handleCreate(e)}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
