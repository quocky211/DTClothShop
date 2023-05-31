import React, { useState, useEffect } from "react";
import "./NewUser.css";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import UserDataService from "../../../services/users";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else if (!user.level) {
      navigate("/");
    }
  }, []);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [sdt, setSDT] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    let newUser = {
      image:image,
      email: email,
      password: password,
      name: name,
      gender: gender,
      address: address,
      birthday: birth,
      sdt: sdt,
    };
    UserDataService.createUser(newUser)
      .then((response) => {
        alert("Thêm mới người dùng thành công")
        navigate("/Admin/Users");
      })
      .catch((e) => {
        alert("Thêm không thành công")
        console.log(e);
      });
  };

  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="newuser">
          <h1 className="newUserTitle">Thêm người dùng</h1>
          <form action="" className="newUserForm">
            <div className="newUserItem">
              <label>Avatar</label>
              <input type="file" id="file" onChange={(e) => setImage(e.target.files[0].name)}/>
            </div>
            <div className="newUserItem">
              <label>Giới tính</label>
              <div className="newUserGender" onChange={(e) => setGender(e.target.value)}>
                <input type="radio" name="gender" id="male" value="Nam" />
                <label htmlFor="male">Nam</label>
                <input type="radio" name="gender" id="female" value="Nữ" />
                <label htmlFor="female">Nữ</label>
                <input type="radio" name="gender" id="others" value="Khác" />
                <label htmlFor="others">Khác</label>
              </div>
            </div>
            <div className="newUserItem">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="newUserItem">
              <label>Kiểu người dùng</label>
              <select className="newUserSelect" name="active" id="active">
                <option value="yes">Người dùng</option>
                <option value="no">Admin</option>
              </select>
            </div>
            <div className="newUserItem">
              <label>Ngày sinh</label>
              <input type="text" placeholder="01.01.2000" onChange={(e) => setBirth(e.target.value)}/>
            </div>
            <div className="newUserItem">
              <label>Số Điện Thoại</label>
              <input type="text" placeholder="012 3456 789" onChange={(e) => setSDT(e.target.value)}/>
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="text" placeholder="nguyenvan@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="newUserItem">
              <label>Mặt khẩu</label>
              <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="newUserItem">
              <label>Địa chỉ</label>
              <input type="text" placeholder="HCM" onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <button className="newUserButton"  onClick={(e) => handleCreate(e)}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
