import React from "react";
import "../../styles/Admin/Personnel.css";

const Products = () => {
  return (
    <div className="containerPersonnel">
      <div className="contentsv">
        <div className="nameColumn">
          <div className="column">Tên Nhân viên</div>
          <div className="column">Số điện thoại</div>
          <div className="column">Email</div>
          <div className="column">Chức năng</div>
        </div>
        <div className="itemsv">
          <div className="row">
            <div className="item">Dương Quốc An</div>
            <div className="item">+8497654324</div>
            <div className="item">duongquocan@gmail.com</div>
            <div className="item">Xóa</div>
          </div>
          <hr />
          <div className="row">
            <div className="item">Nguyễn Huy Bảo Toàn</div>
            <div className="item">+8495444354</div>
            <div className="item">nguyenhuybaotoan@gmail.com</div>
            <div className="item">Xóa</div>
          </div>
          <hr />
          <div className="row">
            <div className="item">Nguyễn Thành An</div>
            <div className="item">+8599876567</div>
            <div className="item">nguyenthanhan@gmail.com</div>
            <div className="item">Xóa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
