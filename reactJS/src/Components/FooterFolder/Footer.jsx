import React from "react";
import "./Footer.css";
import logo from "../Images/logo.webp";
import fb from "../Images/icon/fb.png";
import ins from "../Images/icon/ins.png";
import yt from "../Images/icon/yt.png";
import tiktok from "../Images/icon/tiktok.png";
import {NavLink as Link} from "react-router-dom";


function Header() {
  return (
    <div className="footer">
        <div className="footer_infor">
            <div className="footer__infor-introduce">
                <div className="footer__infor-introduce-name name">Về chúng tôi </div>
                <div className="footer__infor-introduce-infor infor">TechieShop&reg; 
                    là trang mua sắm của thương hiệu TechieShop&reg;, 
                    chuyên các sản phẩm thời trang đẹp, thời thượng
                    giúp bạn tận hưởng cuộc sống thường nhật!</div>
            </div>

            <div className="footer__infor-link">
                <div className="footer__infor-introduce-name name">Liên kết</div>
                    <div className="footer__infor-introduce-infor infor">
                        TechieShop&reg; /SỰ KHỞI ĐẦU/<br/>
                        Chính sách bảo hành<br/>
                        Phương thức thanh toán<br/>
                        <a href="https://tinhte.vn/" target="_blank" rel="noreferrer">Tinhte.vn</a>
                        <a href="https://kenh14.vn/" target="_blank" rel="noreferrer">Kenh14.vn</a>
                    </div>
            </div>

            <div className="footer__infor-contact">
                <div className="footer__infor-introduce-name name">Thông tin liên hệ</div>
                <div className="footer__infor-introduce-infor infor">
                    Trường Đại học Công nghệ Thông tin- ĐHQG TPHCM<br/>
                    <b>Số điện thoại:</b> 0799684120<br/>
                    <b>Email:</b> TechieShop.Corner@gmail.com
                </div>
            </div>

            <div className="footer__infor-logo">
                    <div className="logo-footer">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            <h2>TechieShop</h2>
                        </Link>
                    </div>
                <div className="name">Đăng ký nhận tin</div>
                <form action="">
                    <input type="Email" placeholder="Nhập Email của bạn"/>
                    <button>Đăng ký</button>
                </form>
                <div className="social-icon">
                    <a href=""> <img src={fb} alt="fb" /> </a>
                    <a href=""><img src={ins} alt="fb" /></a>
                    <a href=""><img src={yt} alt="fb" /></a>
                    <a href=""><img src={tiktok} alt="fb" /></a>
                </div>
            </div>
        </div>

        <div className="footer_copyright">
            <p>Copyright &copy; 2022 TechieShop&reg;. Powered by TechieShop</p>
        </div>
    </div>
  );
}

export default Header;
