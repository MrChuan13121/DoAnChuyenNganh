import React, { useState } from "react";
import "../../styles/Admin/AddPatient.css";

function AddPatient({ setOpenModal }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <form className="form">
          <div className="tit">THÔNG TIN KHÁCH HÀNG</div>
          <div className="row">
            <div className="row-name">Họ và tên: </div>
            <div className="row-input">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                placeholder="Vui lòng nhập họ tên"
              />
            </div>
          </div>
          <div className="row">
            <div className="row-name">Giới tính: </div>
            <div className="row-input">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                placeholder="Vui lòng nhập giới tính"
              />
            </div>
          </div>
          <div className="row">
            <div className="row-name">Số điện thoại: </div>
            <div className="row-input">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                placeholder="Vui lòng nhập số điện thoại"
              />
            </div>
          </div>
          <div className="row">
            <div className="row-name">Email: </div>
            <div className="row-input">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                placeholder="Vui lòng nhập email"
              />
            </div>
          </div>
          <div className="row">
            <div className="row-name">Địa chỉ: </div>
            <div className="row-input">
              <input
                className="input"
                type="text"
                id="text"
                name="text"
                placeholder="Vui lòng nhập địa chỉ"
              />
            </div>
          </div>
          <button className="btt-sub" type="submit">
            Tạo mới
          </button>
          <button className="btt-can" type="cancel">
            Huỷ bỏ
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
