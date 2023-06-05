import "./Register.css";
import React, { useState } from "react";
import logo from "../Images/logo-pj.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";
import axios from "axios";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandle = async (e) => {
    e.preventDefault();
    let newUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      level: false,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("https://thawing-hollows-39647.herokuapp.com/user/register", newUser, config)
      .then((res) => {
        console.log(res);
        if (res.data.status === "successfully") {
          navigate("/Login");
          alert("Đăng ký thành công");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <div className="">
      <Header />
      <div className="regismain">
        <div className="logomain">
          <img className="logo" src={logo} alt="logo"></img>
          <p>DTClothShop</p>
        </div>
        <div className="regisForm-format">
          <h3>Đăng ký</h3>
          <form autoComplete="on">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              name="fullname"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              title="Mật khẩu tối thiểu 6 kí tự"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button onClick={registerHandle} type="submit" name="submit">
              Đăng ký
            </button>
          </form>
          <Link to="/Login">
            <p>Bạn đã có tài khoản? Đăng nhập ngay </p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Register;
