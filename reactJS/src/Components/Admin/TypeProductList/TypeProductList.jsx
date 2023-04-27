import React, {useState} from 'react'
import './TypeProductList.css'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { Add, DeleteOutline, Edit } from '@mui/icons-material';
import { productRows } from '../dummyData';
import { Link } from 'react-router-dom';

export default function TypeProductList() {


  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    if(window.confirm("Bạn có muốn xóa không?"))
    {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "type", headerName: "Loại", width: 100 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Admin/Products/" + params.row.id}>
              <button className="typeProductLisAdd"> <Add/> </button>
            </Link>
            <Link to={"/Admin/TypeProduct/" + params.row.id}>
              <button className="typeProductListEdit"> <Edit/> </button>
            </Link>
            <DeleteOutline
              className="typeProductListDelete"
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
        <div className="typeProductList" style={{ height: 800, width: '100%' }}>
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
