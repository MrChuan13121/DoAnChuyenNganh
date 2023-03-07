import React, { useState, useEffect } from "react";
import AddPatient from "./AddPatient";
import "../../styles/Admin/patient.css";
import Delete from "./Delete";
import Update from "./Update";
import { ADDRESS, URLIMG } from "../../dotenv";

const Patient = () => {
  const [modalDele, setModalDele] = useState(false);
  const [isView, setView] = useState([]);
  const [isDel, setDel] = useState([]);
  const [listAllUser, setListUser] = useState([]);

  useEffect(() => {
    getAllPersonnel();
  }, [modalDele, isView]);

  const getAllPersonnel = async () => {
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

  return (
    <div className="containerPatient">
      <div>
        {isView.length != 0 ? (
          <div className="info-p">
            {console.log(isView)}
            <div className="user-Details">
              <div className="header">
                <div className="panel">THÔNG TIN KHÁCH HÀNG</div>
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
              <div className="user-left">
                <form>
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
                    Địa chỉ:
                    <span className="value-v1"> {isView.address}</span>
                  </div>
                </form>
              </div>
              <div className="user-right">
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
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <div className="header">
          <div className="panel">QUẢN LÝ KHÁCH HÀNG</div>
        </div>
        {modalDele && (
          <Delete setModalDele={setModalDele} idPersonnel={isDel} />
        )}
        <table id="customers">
          <tr>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Chức năng</th>
          </tr>
          {listAllUser.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.phoneNumber}</td>
                <td>{val.email}</td>
                <td>{val.address}</td>
                <td className="icon">
                  <div>
                    <button
                      className="delete"
                      onClick={() => {
                        setModalDele(true);
                        setDel(val);
                      }}
                    >
                      <i class="fa fa-trash" />
                      &nbsp; Xoá
                    </button>
                    &nbsp;
                    <button className="delete" onClick={() => setView(val)}>
                      <i class="fas fa-info"></i>
                      &nbsp; Chi tiết
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Patient;
