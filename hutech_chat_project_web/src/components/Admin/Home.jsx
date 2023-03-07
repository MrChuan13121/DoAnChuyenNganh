import React, { useState, useEffect } from "react";
import "../../styles/Admin/Home.css";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { ADDRESS, URLIMG } from "../../dotenv";
import RechartsExample from "./RechartsExample";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listServiceAll, setListServiceAll] = useState([]);
  const [listAllUser, setListUser] = useState([]);
  const [listAllPersonnel, setListPersonnel] = useState([]);

  const Navigate = useNavigate();
  useEffect(() => {
    getAllService();
    getAllUser();
    getAllPersonnel();
  }, []);

  const getAllService = async () => {
    await fetch(ADDRESS + "allServices", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        setListServiceAll(data);
      });
  };

  const getAllUser = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "getAll/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data);
        setListUser(data.data);
      });
  };

  const getAllPersonnel = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "getAll/personnel", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data);
        setListPersonnel(data.data);
      });
  };

  return (
    <div className="container-admin">
      <div className="charts">
        <div
          className="chart red"
          onClick={() => {
            Navigate("/services");
          }}
        >
          <IoIcons.IoIosPaper />
          &ensp;Dịch vụ({listServiceAll.length})
        </div>
        <div
          className="chart green"
          onClick={() => {
            Navigate("/patient");
          }}
        >
          <FaIcons.FaCartPlus />
          &ensp;Khách hàng({listAllUser.length})
        </div>
        <div
          className="chart blue"
          onClick={() => {
            Navigate("/personnel");
          }}
        >
          <IoIcons.IoMdPeople />
          &ensp;Nhân viên({listAllPersonnel.length})
        </div>
        <div
          className="chart yellow"
          onClick={() => {
            Navigate("/book");
          }}
        >
          {" "}
          <FaIcons.FaEnvelopeOpenText />
          &ensp;Lịch hẹn
        </div>
      </div>
      <div className="bigChart">
        <div className="chartA">
          <RechartsExample />
          <div>
            <text>Thống kê số lịch đã đặt trong 6 ngày trước</text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
