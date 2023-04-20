import React from 'react'
import './User.css';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';
import {Link} from 'react-router-dom'
export default function User() {
  return (
    <div>
        <Topbar />
        <div className="container-admin">
          <Sidebar/>
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Edit User</h1>
                    <Link to="/Admin/NewUser">
                      <button className="userAddButton">Create</button>
                    </Link>
                </div>
                <div className="userContainer">
                  <div className="userShow">
                    <div className="userShowTop">
                      <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/326711522_706011897851934_8382087031805852351_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=N-0Nwfv2VlQAX_a8sJL&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfA7Zi8gLnPXYOd387d1rUpOWFtOlgaNLH-OVJRHF1wGOg&oe=644634A3" alt="" className="userShowImg" />
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
                          <img className='userUpdateImg' src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/326711522_706011897851934_8382087031805852351_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=N-0Nwfv2VlQAX_a8sJL&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfA7Zi8gLnPXYOd387d1rUpOWFtOlgaNLH-OVJRHF1wGOg&oe=644634A3" alt="" />
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
