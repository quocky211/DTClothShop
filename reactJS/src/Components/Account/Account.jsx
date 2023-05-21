import "./Account.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { FakeData } from "../fakedata";
import { Link } from "react-router-dom";

function Account() {
  var user = FakeData[4].find(function (item) {
    return item.matk === "TK01";
  });

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
                <input type="text" value={user.name} size={30} className="" />
              </td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>
                <input type="radio" name="gender" /> <label>Nam</label>
                <input type="radio" name="gender" /> <label>Nữ</label>
                <input type="radio" name="gender" /> <label>Khác</label>
              </td>
            </tr>
            <tr>
              <td>Ngày sinh</td>
              <td>
                <input type="date" value={user.date} size={30} />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input type="tel" value={user.phone} size={30} />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input type="email" value={user.email} size={30} />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={user.address}
                  size={30}
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
