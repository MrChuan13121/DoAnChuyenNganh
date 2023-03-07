import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
// import HomeAdmin from '../../screen/admin/HomeAdmin'
import Services from "../../pages/admin/Services";
import Patient from "../../pages/admin/Patient";
import Personnel from "../../pages/admin/Personnel";
import Book from "../../pages/admin/Book";
import Home from "./Home";

export const SidebarData = [
  {
    title: "Trang chủ",
    path: "/admin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    component: <Home />,
  },
  {
    title: "Dịch vụ",
    path: "/services",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    component: <Services />,
  },
  {
    title: "Bệnh nhân",
    path: "/patients",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
    component: <Patient />,
  },
  {
    title: "Nhân viên",
    path: "/personnel",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
    component: <Personnel />,
  },
  {
    title: "Lịch hẹn",
    path: "/book",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
    component: <Book />,
  },
];
