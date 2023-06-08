import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo-pj.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import fb from "../Images/fb.png";
import gg from "../Images/gg.png";
import axios from "axios";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { useDispatch } from "react-redux";
import { login } from "../../redux/credentials";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login(props) {
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let navigate = useNavigate();
// show model
const [show, setShow] = useState(false);

const handleClose = () => {
    setShow(false);
};
const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      email: useremail,
      password: password,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(
        "https://thawing-hollows-39647.herokuapp.com/user/login",
        user,
        config
      )
      .then((res) => {
        if(res.data.accessToken)
        {
          window.localStorage.setItem(
            "JWT",
            JSON.stringify(res.data.accessToken)
          );
          window.localStorage.setItem(
            "refreshToken",
            JSON.stringify(res.data.refreshToken)
          );
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          window.localStorage.setItem("Email", useremail);
        }
        else{
          handleShow()
        }
        
        //console.log(res.data.user.level)
        if (res.data.user.level === true) navigate("/Admin");
        else navigate("/");
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };
  return (
    <div className="">
      <Header />
      <div className="loginmain">
        <div className="logomain">
          <img className="logo" alt="" src={logo}></img>
          <p>DTClothShop</p>
        </div>

        <div className="loginForm">
          <h3>Đăng nhập</h3>
          <form action="POST" onSubmit={handleSubmit}>
            <input
              value={useremail}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="username"
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              name="password"
              placeholder="Mật khẩu"
              required
            />
            <button name="submit" type="submit">
              Đăng nhập
            </button>
          </form>
          {/* <p>HOẶC</p> */}
          {/* <div className="fb-and-gg">

            <img
              src={gg}
              alt="fb"
            />
            <p>Đăng nhập với Google</p>
          </div> */}
          <br></br>
          <Link to="/Register">
            <p>Bạn chưa có tài khoản? Đăng ký ngay</p>
          </Link>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Đăng nhập thất bại</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
