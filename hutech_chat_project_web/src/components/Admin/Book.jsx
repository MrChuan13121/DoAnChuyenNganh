import "../../styles/Admin/book.css";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Content } from "../../pages/staff/tab.jsx";
import "../../styles/Staff/tab.css";
import { useNavigate } from "react-router-dom";
import { ADDRESS } from "../../dotenv";
import DemoApp from "./FullCalendar";

const Book = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isView, setView] = useState([]);
  const [listBookWait, setListBooksWait] = useState([]);
  const [listBookAccecpt, setlistBookAccecpt] = useState([]);
  const [listBookCancel, setlistBookCancel] = useState([]);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      getListBookWait();
      getListBookAccept();
      getListBookCancel();
      setActive(index);
    }
  };

  useEffect(() => {
    getListBookWait();
    getListBookAccept();
    getListBookCancel();
  }, []);

  const getListBookWait = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "books/0", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((dt) => {
        setListBooksWait(dt.data);
      });
  };
  const getListBookAccept = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "books/1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((dt) => {
        setlistBookAccecpt(dt.data);
      });
  };
  const getListBookCancel = async () => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "books/2", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((dt) => {
        setlistBookCancel(dt.data);
      });
  };

  const changeStatusBook = async (idBook, status) => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + idBook + "/" + status, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((dt) => {
        console.log(dt);
        getListBookWait();
        getListBookAccept();
        getListBookCancel();
      });
  };

  return (
    <div className="containerBook">
      <div className="mainBox">
        {isView.length != 0 ? (
          <div className="info">
            {console.log(isView)}
            <div className="user-Details">
              <div className="header">
                <div className="panel">THÔNG TIN BỆNH NHÂN</div>
                <button
                  onClick={() => {
                    setView([]);
                  }}
                  className="exit"
                >
                  X
                </button>
              </div>
              <hr />
              <div className="user-left-book">
                <div className="title-v1">
                  <i class="fa fa-user"> &nbsp;</i>
                  Họ và tên:
                  <span className="value-v1"> {isView.name}</span>
                </div>
                <div className="title-v1">
                  <i class="fa fa-phone"> &nbsp;</i>
                  Số điện thoại:
                  <span className="value-v1"> {isView.phone}</span>
                </div>
                <div className="title-v1">
                  <i class="far fa-calendar-alt"> &nbsp;</i>
                  Ngày khám:
                  <span className="value-v1"> {isView.date}</span>
                </div>
              </div>
              <div className="user-right-book">
                <div className="title-v1">
                  <i class="fa fa-envelope"> &nbsp;</i>
                  Email:
                  <span className="value-v1"> {isView.email}</span>
                </div>
                <div className="title-v1">
                  <i class="fa fa-home"> &nbsp;</i>
                  Địa chỉ khám:
                  <span className="value-v1"> 10 CMT8, Tân Bình</span>
                </div>
                <div className="title-v1">
                  <i class="far fa-clock"> &nbsp;</i>
                  Thời gian:
                  <span className="value-v1"> {isView.time}</span>
                </div>
              </div>
              {false ? (
                <div className="btn">
                  <button className="confirm">Xác nhận</button>
                  <button className="cancel">Huỷ bỏ</button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div id="tabs">
          <Tabs>
            <Tab onClick={handleClick} active={active === 0} id={0}>
              Đang chờ
            </Tab>
            <Tab onClick={handleClick} active={active === 1} id={1}>
              Đã xác nhận
            </Tab>
            <Tab onClick={handleClick} active={active === 2} id={2}>
              Đã hủy
            </Tab>
            <Tab onClick={handleClick} active={active === 3} id={3}>
              Phân bổ lịch
            </Tab>
          </Tabs>
          <>
            <Content active={active === 0}>
              {listBookWait.length != 0 ? (
                <div>
                  <table id="customers">
                    <tr>
                      <th>Id người dùng</th>
                      <th>Thời gian hẹn</th>
                      <th>Ngày hẹn</th>
                      <th>Ngày tạo</th>
                      <th>Chức năng</th>
                    </tr>
                    {listBookWait.map((info) => (
                      <tr>
                        <td>{info.userId}</td>
                        <td>{info.time}</td>
                        <td>{info.date}</td>
                        <td>{info.createdAt.toString().split(".")[0]}</td>
                        <td>
                          <div>
                            <button
                              className="dele"
                              onClick={() => {
                                changeStatusBook(info._id, 1);
                              }}
                            >
                              &nbsp; Xác nhận
                            </button>
                            &nbsp;
                            <button
                              className="dele"
                              onClick={() => {
                                changeStatusBook(info._id, 2);
                              }}
                            >
                              &nbsp; Hủy đơn
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : null}
            </Content>

            <Content active={active === 1}>
              {listBookAccecpt.length != 0 ? (
                <div>
                  <table id="customers">
                    <tr>
                      <th>Id người dùng</th>
                      <th>Thời gian hẹn</th>
                      <th>Ngày hẹn</th>
                      <th>Ngày tạo</th>
                    </tr>
                    {listBookAccecpt.map((info) => (
                      <tr>
                        <td>{info.userId}</td>
                        <td>{info.time}</td>
                        <td>{info.date}</td>
                        <td>{info.createdAt.toString().split(".")[0]}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : null}
            </Content>
            <Content active={active === 2}>
              {listBookCancel.length != 0 ? (
                <div>
                  <table id="customers">
                    <tr>
                      <th>Id người dùng</th>
                      <th>Thời gian hẹn</th>
                      <th>Ngày hẹn</th>
                      <th>Ngày tạo</th>
                      <th>Chức năng</th>
                    </tr>
                    {listBookCancel.map((info) => (
                      <tr>
                        <td>{info.userId}</td>
                        <td>{info.time}</td>
                        <td>{info.date}</td>
                        <td>{info.createdAt.toString().split(".")[0]}</td>
                        <td>
                          <div>
                            <button
                              className="dele"
                              // onClick={() => {
                              //   setView(val);
                              //   setName(val.name);
                              //   setPN(val.phoneNumber);
                              //   setEmail(val.email);
                              //   setAddress(val.address);
                              //   setFile();
                              // }}
                            >
                              &nbsp; Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : null}
            </Content>
            <Content active={active === 3}>
              <DemoApp />
            </Content>
          </>
        </div>
      </div>
    </div>
  );
};

export default Book;
