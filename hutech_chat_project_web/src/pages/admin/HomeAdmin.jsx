import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Admin/HomeAdmin.css";

const HomeAdmin = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Trang chủ",
      icon: <i class="fa fa-home" />,
    },
    {
      path: "/services",
      name: "Dịch vụ",
      icon: <i class="fa fa-calendar-plus-o" />,
    },
    {
      path: "/patient",
      name: "Khách hàng",
      icon: <i class="fa fa-user" />,
    },
    {
      path: "/personnel",
      name: "Nhân viên",
      icon: <i class="fa fa-users" />,
    },
    {
      path: "/book",
      name: "Đặt lịch",
      icon: <i class="fa fa-calendar-o" />,
    },
    {
      path: "/",
      name: "Đăng xuất",
      icon: <i class="fa fa-sign" />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "110px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            QUẢN LÝ
          </h1>
          <div style={{ marginLeft: isOpen ? "40px" : "0px" }} className="bars">
            <i class="fa fa-bars" onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main style={{ marginLeft: isOpen ? "20px" : "110px" }}>{children}</main>
    </div>
  );
};

export default HomeAdmin;
