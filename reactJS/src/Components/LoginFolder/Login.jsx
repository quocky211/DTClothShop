import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.webp";
import { Link } from "react-router-dom";
import { Log_in } from "../../actions";
import { connect } from "react-redux";
import { useState } from "react";
import fb from "../Images/fb.png";
import gg from "../Images/gg.png";
import axios from "axios";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";

function Login(props) {
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleClick = async(e) => {
      e.preventDefault();
      let user = {
        email: useremail,
        password: password
      }
      let config = {
        headers:{
          "Content-Type": "application/json",
        }
      };
      await axios.post('http://localhost:3001/user/login', user, config)
      .then((res)=>{
        props.Log_in();
        navigate("/MainPage");
        console.log(props.isLoggedin);
      })
      .catch((err) => {console.log("Error" + err);})
  };
  return (
    <div className="">
            <Header/>
<div className="loginmain">

      <div className="logomain">
        <img className="logo" alt="" src={logo}></img>
        <p>TechieShop</p>
      </div>

      <div className="loginForm">
        <h3>Đăng nhập</h3>
        <form action="">
          <input
            value={useremail} onChange={(e)=>setEmail(e.target.value)} type="text"
            name="username" placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)} type="password" value={password}
            name="password" placeholder="Mật khẩu" required
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
    <Footer/>
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
