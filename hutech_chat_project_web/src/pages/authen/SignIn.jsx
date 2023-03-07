import React, { useState, useEffect } from "react";
import "../../styles/Authen/signIn.css";
import { ADDRESS } from "../../dotenv";
import Home from "../staff/Home";
import HomeAdmin from "../admin/HomeAdmin";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import image from "../../assets/images/background.png";
import panel from "../../assets/images/panel.jpg";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(1);
  useEffect(() => {
    localStorage.clear();
    handleSubmit();
  }, []);

  const navigate = useNavigate();
  const local = useLocation();
  console.log(local);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let result = {};
      await fetch(ADDRESS + "signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.status === 1) {
            const auth = data.auth[0];
            console.log(auth);
            const token = auth.token;
            const userId = auth.userId;
            if (data.role !== "user") {
              localStorage.setItem("token", token);
              localStorage.setItem("userId", userId);
              localStorage.setItem("role", data.role);
            }
          }
          result = data;
          console.log(result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      if (result.status === 1 && result.role !== "user") {
        localStorage.setItem("accessToken", true);
        console.log(localStorage.getItem("accessToken"));
        console.log(result.role);
        if (result.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else if (result.status === 2) {
        setStatus(2);
        console.log("Mật khẩu không chính xác");
      } else if (result.status === 3) {
        setStatus(3);
        console.log("Tài khoản chưa được đăng ký");
      } else if (result.role !== "admin" && result.role !== "personnel") {
        setStatus(4);
        console.log("Bạn không có quyền truy cập vào trang web");
      }
    }
  };
  return (
    <div className="container">
      <div
        className="main"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className="form-input">
          <div className="header">HEALTHCARE IS WEALTH</div>
          <form className="email" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              placeholder="Vui lòng nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot">Quên mật khẩu</div>
            <button className="submit" type="submit">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
