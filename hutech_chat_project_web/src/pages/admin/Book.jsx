import book from "../../styles/Admin/book.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "../staff/tab.jsx";
import "../../styles/Staff/tab.css";
import { useNavigate } from "react-router-dom";
import ReactTable from "react-table";

const Book = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isView, setView] = useState([]);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const userInfo = [
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

  const columns = [
    {
      header: "Name",
      accessor: "name", // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
    },
    {
      header: "Age",
      accessor: "age",
      Cell: (props) => <span className="number">{props.value}</span>, // Tùy biến component Cell.
    },
    {
      id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
      header: "Friend Name",
      accessor: (d) => d.friend.name, // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
    },
    {
      header: (props) => <span>Friend Age</span>, // Tùy biến component Header
      accessor: "friend.age", // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
    },
  ];

  return (
    <div className="containerBook">
      <div className="contentsv">
        <div className="nameColumn">
          <div className="column">Tên khách hàng</div>
          <div className="column">Giờ Khám</div>
          <div className="column">Trạng thái</div>
          <div className="column">Chức năng</div>
        </div>
        <div className="itemsv">
          <div className="row">
            <div className="item">Đường Kim Yên</div>
            <div className="item">09:00 06/12/2022</div>
            <div className="item">Chờ xác nhận</div>
            <div className="item">Xác nhận | Hủy</div>
          </div>
          <hr />
          <div className="row">
            <div className="item">Trần Văn Toản</div>
            <div className="item">08:30 25/11/2022</div>
            <div className="item">Đã xác nhận</div>
            <div className="item">Hủy</div>
          </div>
        </div>
      </div>
      {/* <div className="mainBox">
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
              <div className="user-left">
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
              <i class="fa fa-plus-square"> &nbsp;</i>
              Đặt lịch
            </Tab>

            <Tab onClick={handleClick} active={active === 1} id={1}>
              <i class="fa fa-stethoscope"> &nbsp;</i>
              Xem lịch
            </Tab>
          </Tabs>
          <>
            {userInfo.map((info) => (
              <Content active={active === 0}>
                <div className="mainBox">
                  <div className="user-info">
                    <tr>
                      <td class="text-center">
                        <i class="fa fa-info-circle"></i>
                      </td>
                      <td>
                        {" "}
                        &nbsp; Một đăng ký khám bệnh mới từ{" "}
                        <a onClick={() => setView(info)}>
                          <a href="#">{info.name}.</a>
                        </a>
                      </td>
                      <td className="time-">
                        &nbsp; Thời gian {info.time} {info.date}
                      </td>
                    </tr>
                  </div>
                </div>
              </Content>
            ))}

            <Content active={active === 1}>
             
            </Content>
          </>
        </div>
      </div> */}
    </div>
  );
};

export default Book;
