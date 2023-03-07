import React from "react";
import "../../styles/Admin/patient.css";

const data = [
  {
    userid: "1",
    name: "Nguyen Van B",
    sex: "Nam",
    phone: "09876545678",
    email: "nguyenb@gmail.com",
    date: "2022/11/11",
    time: "9:30",
  },

  {
    userid: "2",
    name: "Nguyen Van C",
    sex: "Nam",
    phone: "09876545356786543",
    email: "nguyenc@gmail.com",
    date: "2022/11/11",
    time: "13:30",
  },

  {
    userid: "3",
    name: "Nguyen Thi C",
    sex: "Nu",
    phone: "0134567543",
    email: "nguyenc@gmail.com",
    date: "2022/11/14",
    time: "10:00",
  },
];

const Patient = () => {
  return (
    <div className="containerPatient">
      <div className="contentsv">
        <div className="nameColumn">
          <div className="column">Tên người dùng</div>
          <div className="column">Số điện thoại</div>
          <div className="column">Email</div>

          <div className="column">Chức năng</div>
        </div>
        <div className="itemsv">
          <div className="row">
            <div className="item">Đường Kim Yên</div>
            <div className="item">+8493222456</div>
            <div className="item">duongkimyen@gmail.com</div>
            <div className="item">Xóa | Khóa</div>
          </div>
          <hr />
          <div className="row">
            <div className="item">Nguyễn Khánh Hồng</div>
            <div className="item">+8493332456</div>
            <div className="item">nguyenkhanhhong@gmail.com</div>
            <div className="item">Xóa | Khóa</div>
          </div>
          <hr />
          <div className="row">
            <div className="item">Trần Văn Toản</div>
            <div className="item">+849333567</div>
            <div className="item">tranvantoan@gmail.com</div>
            <div className="item">Xóa | Khóa</div>
          </div>
        </div>
      </div>
      {/* <table id="customers">
        <tr>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Số điện thoại</th>
          <th>Email</th>
          <th>Chức năng</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.sex}</td>
              <td>{val.phone}</td>
              <td>{val.email}</td>
              <td className="fun">
                <i class="fa fa-trash" aria-hidden="true">
                  {" "}
                  &nbsp;
                </i>
                <i class="fas fa-edit"></i>
              </td>
            </tr>
          );
        })}
      </table> */}
    </div>
  );
};

export default Patient;
