import React, {useState} from 'react'
import "./UserList.css";
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { userRows } from '../dummyData';
import { Link } from 'react-router-dom';

export default function UserList() {

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item)=> item.id !== id))
  }
  
  const columns= [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'Người dùng', width: 200, renderCell: (params)=> {
      return (
        <div className='userListUser'>
          <img className='userListImg' src={params.row.avatar} alt="" />
          {params.row.userName}
        </div>
      )
    } },
    { field: 'email', headerName: 'Email', width: 250},
    { field: 'phone', headerName: 'SĐT', width: 150},
    { field: 'transaction', headerName: 'Tổng chi', width: 100 },
    { field: 'status', headerName: 'Trạng thái', width: 130 },
    { field: 'action', headerName: 'Hành động', width: 150, renderCell: (params)=> {
      return (
        <>
          <Link to={'/Admin/User/' + params.row.id}>
            <button className="userListEdit"> Edit </button>
          </Link>
          <DeleteOutline className="userListDelete" onClick={ ()=> handleDelete(params.row.id) }/>
        </>
      )
    } },
  ];
  
  
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="userlist"  style={{ height: 800, width: '100%' }}>
          <DataGrid 
            rows={data}
            disableRowSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
