import "./Account.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Account() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    getInforUser();
  },[])

  const getInforUser = () =>{
    const result = localStorage.getItem('user');
    const user = JSON.parse(result);
    setName(user.name)
    setBirthday( moment(user.birthday).format('YYYY-MM-DD'));
    setGender(user.gender)
    setPhone(user.phone)
    setEmail(user.email)
    setAddress(user.address)
  }
  return (
    <div className="">
      <Header />
      <div className="account-info-container">
        <div className="account-info">
          <h3>Thông tin cá nhân</h3>
          <table cellSpacing={20}>
            <tr>
              <td>Họ và tên</td>
              <td>
                <input type="text" value={name} size={30} onChange={(event) => setName(event.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>
              <label><input type="radio" name="gender" value="Nam" checked={gender === 'Nam'} onChange={(event) => setGender(event.target.value)}/> Nam</label>
              <label><input type="radio" name="gender" value="Nữ" checked={gender === 'Nữ'} onChange={(event) => setGender(event.target.value)}/> Nữ</label>
              <label><input type="radio" name="gender" value="Khác"checked={gender === 'Khác'} onChange={(event) => setGender(event.target.value)}/> Khác</label>
              </td>
            </tr>
            <tr>
              <td>Ngày sinh</td>
              <td>
                <input type="date" value={birthday} size={30} onChange={(event) => setBirthday(event.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input type="tel" value={phone} size={30} onChange={(event) => setPhone(event.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" value={email} size={30} onChange={(event) => setEmail(event.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={address}
                  size={30} onChange={(event) => setAddress(event.target.value)}
                />
              </td>
            </tr>
            <tr style={{textAlign:"center"}}>
              <td colSpan={2} style={{textAlign:"center"}} className="button-submit">
                <button type="submit">Cập nhật</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="buy-history">
          <h3>Lịch sử mua hàng</h3>
          <table>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            <tr>
              <td>DH01</td>
              <td>Phù Mỹ, Bình Định </td>
              <td>097 238 9257</td>
              <td>123.000đ</td>
              <td>Đã giao hàng</td>
              <td>
                <Link to={"/OrderDetail/" + 1}>
                  <button>Xem chi tiết</button>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Account;
