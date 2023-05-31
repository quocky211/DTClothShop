import React, { useState, useEffect } from "react";
import "./UserList.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import ao from "../Images/ao1.jpg";
import UserDataService from "../../../services/users";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = () => {
    UserDataService.getAllUser()
      .then(function (res) {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("Bạn có muốn xóa không?")) {
      UserDataService.deleteUser(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "Người dùng",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "SĐT", width: 150 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    {
      field: "birthdays",
      headerName: "Ngày sinh",
      width: 150,
      renderCell: (params) => {
        return (
          <Moment format="DD/MM/YYYY" >{(params.row.birthday) }</Moment>
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
            <Link to={"/Admin/User/" + params.row.id}>
              <button className="userListEdit">
                {" "}
                <Edit />{" "}
              </button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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
        <div className="userlist" style={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={users}
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
