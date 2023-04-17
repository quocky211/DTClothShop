import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.webp";
import { Link } from "react-router-dom";
import { Log_in } from "../../actions";
import { connect } from "react-redux";
import { useState } from "react";
import fb from "../Images/fb.png";
import gg from "../Images/gg.png";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const usernamechange = (event) => {
    setUsername(event.target.value);
  };
  const passwordchange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    if (username !== "" && password !== "") {
      props.Log_in();
      navigate("/MainPage");
      console.log(props.isLoggedin);
    }
  };
  return (
    <div className="loginmain">
      <div className="logomain">
        <img className="logo" alt="" src={logo}></img>
        <p>TechieShop</p>
      </div>

      <div className="loginForm">
        <h3>Đăng nhập</h3>
        <form action="">
          <input
            value={username}
            onChange={usernamechange}
            type="text"
            name="username"
            id=""
            placeholder="Email hoặc số điện thoại"
            required
          />
          <input
            onChange={passwordchange}
            type="password"
            value={password}
            name="password"
            id=""
            placeholder="Mật khẩu"
            required
          />
          <button name="submit" type="submit" onClick={() => handleClick()}>
            Đăng nhập
          </button>
        </form>
        <p>Hoặc</p>
        <div className="fb-and-gg">
          <img src={fb} alt="fb" />
          <img src={gg} alt="fb" />
        </div>
        <br></br>
        <Link to="/Register">
          <p>Bạn chưa có tài khoản? Đăng ký ngay</p>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state._todoProduct.isLoggedin,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    Log_in: () => dispatch(Log_in()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
