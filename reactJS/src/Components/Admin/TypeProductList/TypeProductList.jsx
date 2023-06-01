import React, { useState, useEffect } from "react";
import "./TypeProductList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductDataService from "../../../services/products";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function TypeProductList() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);

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
  // modal after click delete
  const handleDelete = (id) => {
    ProductDataService.deleteProduct(id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const [id, setId] = useState(-1);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  }
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 50,
      renderCell: (params) => {
        return <p>{params.row.product._id}</p>;
      },
    },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 350,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.product.name}</div>;
      },
    },
    {
      field: "type",
      headerName: "Loại",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.product.category_detail_id.name}
          </div>
        );
      },
    },
    {
      field: "material",
      headerName: "Chất liệu",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.product.marterial}</div>
        );
      },
    },
    {
      field: "gia",
      headerName: "Giá",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {vnd.format(params.row.product.price)}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Admin/Products/" + params.row.product._id}>
              <Tooltip title="Thêm chi tiết sản phẩm">
                <button className="typeProductListAdd">
                  {" "}
                  <Add />{" "}
                </button>
              </Tooltip>
            </Link>
            <Link to={"/Admin/TypeProduct/" + params.row.product._id}>
              <button className="typeProductListEdit">
                {" "}
                <Edit />{" "}
              </button>
            </Link>
            <Button variant="primary" onClick={handleShow(params.row.product._id)}>
              <DeleteOutline className="typeProductListDelete" />
            </Button>
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
            getRowId={(row) => row.product._id}
            disableRowSelectionOnClick
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
          />
          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDelete(id)}>
                Xóa
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
    </div>
  );
}
