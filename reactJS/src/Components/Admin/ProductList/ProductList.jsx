import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductDataService from "../../../services/products";
import { useNavigate } from "react-router-dom";


export default function ProductList() {
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

  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    ProductDataService.getProductDetail(typeProductId)
      .then(function(res){ 
        console.log(res.data)
        setProductDetails(res.data)})
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xóa không?")) {
     
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.path} alt="" />
          </div>
        );
      },
    },
    { field: "color", headerName: "Màu sắc", width: 100 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "qty", headerName: "Số lượng", width: 100 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Admin/Product/" + params.row.id}>
              <button className="productListEdit"> 
                {" "}
                <Edit />
                {" "}
              </button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="productList" style={{ height: 800, width: "100%" }}>
          <div className="productListTitle">
            <h2>Chi tiết sản phẩm</h2>
            <Link to={"/Admin/NewProduct/" + typeProductId}>
              <button className="productListButton">Thêm</button>
            </Link>
          </div>
          <DataGrid
            rows={productDetails}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
}
