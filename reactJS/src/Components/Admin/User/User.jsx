import React from 'react'
import './User.css';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import avatar from '../Images/avatar.jpeg';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';
export default function User() {
  return (
    <div>
        <Topbar />
        <div className="container-admin">
          <Sidebar/>
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Sửa thông tin người dùng</h1>
                </div>
                <div className="userContainer">
                  <div className="userShow">
                    <div className="userShowTop">
                      <img src={avatar} alt="" className="userShowImg" />
                      <div className="userShowTopTitle">
                        <span className="userShowUserName">Quoc Ky</span>
                        <span className="userShowUserTitle">Backend Dev</span>
                      </div>
                    </div>
                    <div className="userShowBottom">
                      <span className="userShowTitle">Account Details</span>
                      <div className="userShowInfo">
                        <PermIdentity className='userShowIcon'/>
                        <span className="userShowInfoTitle">Quốc Kỳ</span>
                      </div>
                      <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">02.11.2002</span>
                      </div>
                      <span className="userShowTitle">Contact Details</span>
                      <div className="userShowInfo">
                        <PhoneAndroid className='userShowIcon'/>
                        <span className="userShowInfoTitle">0972389257</span>
                      </div>
                      <div className="userShowInfo">
                        <MailOutline className='userShowIcon'/>
                        <span className="userShowInfoTitle">quockynguyen02@gmail.com</span>
                      </div>
                      <div className="userShowInfo">
                        <LocationSearching className='userShowIcon'/>
                        <span className="userShowInfoTitle">TP HCM</span>
                      </div>
                    </div>
                  </div>
                  <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Họ và tên</label>
                          <input type="text" name="" placeholder='Quốc Kỳ' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                          <label>Ngày sinh</label>
                          <input type="text" name="" placeholder='02.11.2002' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                          <label>Số Điện Thoại </label>
                          <input type="text" name="" placeholder='0972389257' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                          <label>Email</label>
                          <input type="text" name="" placeholder='quockynguyen02@gmail.com' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                          <label>Địa chỉ</label>
                          <input type="text" name="" placeholder='TP HCM' className='userUpdateInput' />
                        </div>
                      </div>
                      <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                          <img className='userUpdateImg' src={avatar} alt="" />
                          <label htmlFor="file"> <Publish className='userUpdateIcon'/> </label>
                          <input type="file" id="file" style={{display:'none'}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
  )
}
