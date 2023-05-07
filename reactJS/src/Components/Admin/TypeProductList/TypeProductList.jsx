import React, { useState, useEffect } from "react";
import "./TypeProductList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductDataService from "../../../services/products";

export default function TypeProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [products]);

  const getProducts = () => {
    ProductDataService.adminGetProducts()
      .then(function (res) {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xóa không?")) {
      ProductDataService.deleteProduct(id)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return <p>{params.row._id}</p>;
      },
    },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 400,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    { field: "category_detail_id", headerName: "Loại", width: 100 },
    { field: "marterial", headerName: "Chất liệu", width: 200 },
    {
      field: "gia",
      headerName: "Giá",
      width: 100,
      renderCell: (params) => {
        return <div className="productListItem">{vnd.format(params.row.price)}</div>;
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Admin/Products/" + params.row._id}>
              <button className="typeProductLisAdd">
                {" "}
                <Add />{" "}
              </button>
            </Link>
            <Link to={"/Admin/TypeProduct/" + params.row._id}>
              <button className="typeProductListEdit">
                {" "}
                <Edit />{" "}
              </button>
            </Link>
            <DeleteOutline
              className="typeProductListDelete"
              onClick={() => handleDelete(params.row._id)}
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
        <div className="typeProductList" style={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={products}
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
