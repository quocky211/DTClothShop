import "./Account.css";
import { FakeData } from "../fakedata";


function Account()
{   
    var user = FakeData[4].find(
        function(item){
            return item.matk ==='TK01';
        }
    )

    return(
        <div className="account-info-container">
            <div className="account-info">
                <h3>Thông tin cá nhân</h3>
                <table cellSpacing={20}>
                    <tr>
                        <td>Họ và tên</td>
                        <td><input type="text" value={user.name} size={30} className="" /></td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>
                            <input type="radio" name='gender' /> <label>Nam</label>
                            <input type="radio" name='gender' /> <label>Nữ</label>
                            <input type="radio" name='gender' /> <label>Khác</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Ngày sinh</td>
                        <td><input type="date" value={user.date} size={30} /></td>
                    </tr>
                    <tr>
                        <td>Số điện thoại</td>
                        <td><input type="tel" value={user.phone} size={30} /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="email" value={user.email} size={30}/></td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td><input type="text" placeholder="Địa chỉ" value={user.address} size={30} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center" className="button-submit"><button type="submit">Cập nhật</button></td>
                    </tr>
                </table>
            </div>
            <div className="buy-history">
                <h3>Lịch sử mua hàng</h3>
                <table>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Img</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>DH01</td>
                        <td>Áo doraemon </td>
                        <td>Img</td>
                        <td>123.000đ</td>
                        <td>
                            <button>Mua lại</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default Account;
