import React, { useState } from 'react'
import './ProductList.css'
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { productRows } from '../dummyData';
import { Link } from 'react-router-dom';

export default function ProductList() {

    const [data, setData] = useState(productRows);

    const handleDelete = (id) => {
        setData(data.filter((item)=> item.id !== id))
      }
      
      const columns= [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product', headerName: 'Sản phẩm', width: 200, renderCell: (params)=> {
          return (
            <div className='productListItem'>
              <img className='productListImg' src={params.row.img} alt="" />
              {params.row.name}
            </div>
          )
        } },
        { field: 'type', headerName: 'Loại', width: 100},
        { field: 'color', headerName: 'Màu sắc', width: 100},
        { field: 'size', headerName: 'Size', width: 100},
        { field: 'price', headerName: 'Giá', width: 100 },
        { field: 'quantity', headerName: 'Số lượng', width: 100 },
        { field: 'action', headerName: 'Hành động', width: 150, renderCell: (params)=> {
          return (
            <>
              <Link to={'/Admin/Product/' + params.row.id}>
                <button className="productListEdit"> Edit </button>
              </Link>
              <DeleteOutline className="productListDelete" onClick={ ()=> handleDelete(params.row.id) }/>
            </>
          )
        } },
      ];
  return (
    <div>
        <Topbar />
        <div className="container-admin">
          <Sidebar/>
            <div className="productList" style={{ height: 800, width: '100%' }}>
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
  )
}
