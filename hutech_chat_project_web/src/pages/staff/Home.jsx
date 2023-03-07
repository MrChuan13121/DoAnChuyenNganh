import "../../styles/Staff/HomeStaff.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/Staff/tab.css";
import ChatBody from "../../components/Staff/ChatBody";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { getDatabase, onValue, ref, query } from "firebase/database";
import { ADDRESS, URLIMG } from "../../dotenv";

function Home() {
  const navigate = useNavigate();
  // const [active, setActive] = useState(0);
  // const [isView, setView] = useState([]);
  const [personnel, setpersonnel] = useState();
  useEffect(() => {
    getProfile();
  }, []);
  // const handleClick = (e) => {
  //   const index = parseInt(e.target.id, 0);
  //   if (index !== active) {
  //     setActive(index);
  //   }
  // };

  const getProfile = async () => {
    await fetch(ADDRESS + "user/" + localStorage.getItem("userId"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setpersonnel(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const test = async () => {
  //   const db = getDatabase();
  //   const aa = query(ref(db, "users"));
  //   onValue(aa, (res) => {
  //     console.log("Da vao day");
  //     console.log(res.val());
  //   });
  // };
  const logOut = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="homeStaff">
      {personnel !== undefined ? (
        <div className="table">
          <div className="box">
            <div className="profile">
              <div className="mainBoxProfile">
                <div className="sq">
                  <div className="sqs"></div>
                  <text className="profile-Name">{personnel.name}</text>
                </div>
                <div className="profile-Status">
                  <i class="fa fa-check-circle"> &nbsp;</i>
                  Online
                </div>
                <div className="profile-avt">
                  <img
                    src={URLIMG + "avatars/" + personnel.img}
                    alt=""
                    className="profile-Img"
                  ></img>
                  <button className="profile-Button">
                    <span className="label">Nhân viên</span>
                  </button>
                </div>
                <div className="infor">
                  <hr />
                  <div className="profile-Details">
                    <div className="left">
                      <ul className="title ">
                        <i class="fa fa-user"> &nbsp;</i>
                        Họ và tên
                      </ul>
                      <ul className="title ">
                        <i class="fa fa-phone"> &nbsp;</i>
                        SDT
                      </ul>
                      <ul className="title ">
                        <i class="fa fa-envelope"> &nbsp;</i>
                        Email
                      </ul>
                      <ul className="title ">
                        <i class="fa fa-home"> &nbsp;</i>
                        Địa chỉ
                      </ul>
                    </div>
                    <div className="right">
                      <ul className="title ">{personnel.name}</ul>
                      <ul className="title ">{personnel.phoneNumber}</ul>
                      <ul className="title ">{personnel.email}</ul>
                      <ul className="title ">{personnel.address}</ul>
                    </div>
                  </div>
                  <hr />
                  <div className="end">
                    <button
                      className="logOut"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      <i class="fas fa-sign-out-alt"> &nbsp;</i>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="mainBoxProfile">
                <ChatBody personnel={personnel} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
