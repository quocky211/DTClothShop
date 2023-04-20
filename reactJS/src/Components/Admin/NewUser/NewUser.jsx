import React from "react";
import "./NewUser.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
export default function NewUser() {
  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="newuser">
          <h1 className="newUserTitle">New User</h1>
          <form action="" className="newUserForm">
            <div className="newUserItem">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" />
            </div>
            <div className="newUserItem">
              <label>Giới tính</label>
              <div className="newUserGender">
                <input type="radio" name="gender" id="male" value="male" />
                <label htmlFor="male">Nam</label>
                <input type="radio" name="gender" id="female" value="female" />
                <label htmlFor="female">Nữ</label>
                <input type="radio" name="gender" id="others" value="others" />
                <label htmlFor="others">Khác</label>
              </div>
            </div>
            <div className="newUserItem">
              <label>Trạng thái</label>
              <select className="newUserSelect" name="active" id="active">
                <option value="yes">Khả dụng</option>
                <option value="no">Không khả dụng</option>
              </select>
            </div>
            <div className="newUserItem">
              <label>Ngày sinh</label>
              <input type="text" placeholder="01.01.2000" />
            </div>
            <div className="newUserItem">
              <label>Số Điện Thoại</label>
              <input type="text" placeholder="012 3456 789" />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="text" placeholder="nguyenvan@gmail.com" />
            </div>
            <div className="newUserItem">
              <label>Mặt khẩu</label>
              <input type="text" placeholder="password" />
            </div>
            <div className="newUserItem">
              <label>Địa chỉ</label>
              <input type="text" placeholder="HCM" />
            </div>
            <button className="newUserButton">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
