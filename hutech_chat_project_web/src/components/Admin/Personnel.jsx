import React, { useState, useEffect } from "react";
import "../../styles/Admin/Personnel.css";
import AddPersonnel from "../../components/Admin/AddPersonnel";
import Delete from "../../components/Admin/DeletePersonnel";
import Update from "./Update";
import { ADDRESS, URLIMG } from "../../dotenv";

const Personnel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDele, setModalDele] = useState(false);
  const [modalUp, setModalUp] = useState(false);
  const [isView, setView] = useState([]);
  const [isDel, setDel] = useState([]);
  const [listAllPersonnel, setListPersonnel] = useState([]);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPN] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState({
    name: "",
    phoneNumber: null,
    email: "",
    address: "",
  });

  useEffect(() => {
    getAllPersonnel();
  }, [modalOpen, modalDele, modalUp, isView]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      file.uri = base64data;
      setFile(file);
    };
  };

  const updatePersonnel = async (e) => {
    e.preventDefault();
    if (name != "" && phoneNumber != null && email != "" && address != "") {
      const formdata = new FormData();
      const tokenString = localStorage.getItem("token");
      formdata.append("nameUser", name);
      if (file != undefined) {
        formdata.append("image", file);
      }
      formdata.append("img", isView.img);
      formdata.append("phoneNumber", phoneNumber);
      formdata.append("email", email);
      formdata.append("address", address);
      formdata.append("role", "personnel");
      formdata.append("status", false);

      await fetch(ADDRESS + "updateuser/" + isView._id, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenString,
        },
        body: formdata,
      })
        .then((reponse) => reponse.json())
        .then(async (dt) => {
          console.log(dt);
          setView([]);
        });
    } else {
      if (name == "") {
        setData({ name: "Không được để trống" });
        setView([]);
      } else if (email == "") {
        setData({ email: "Không được để trống email" });
        setView([]);
      } else if (phoneNumber == null) {
        setData({ phoneNumber: "Không được để trống số điện thoại" });
        setView([]);
      } else if (address == "") {
        setData({ address: "Không được để trống địa chỉ" });
        setView([]);
      }
    }
  };

  return (
    <div className="containerPatient">
      <div>
        {isView.length != 0 ? (
          <form onSubmit={updatePersonnel}>
            <div className="info-p">
              {console.log(isView)}
              <div className="user-Details">
                <div className="header">
                  <div className="panel">THÔNG TIN NHÂN VIÊN</div>
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
                <div className="form-dt">
                  <div className="user-image-per">
                    {file ? (
                      <img src={file.preview} className="image-book"></img>
                    ) : (
                      <img
                        src={URLIMG + "avatars/" + isView.img}
                        className="image-book"
                      ></img>
                    )}
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>

                  <div className="user-left-per">
                    <div className="title-v1">
                      <i class="fa fa-user"> &nbsp;</i>
                      Họ và tên:
                      <input
                        className="value-v1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="title-v1">
                      <i class="fa fa-user"> &nbsp;</i>
                      Số điện thoại:
                      <input
                        className="value-v1"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPN(e.target.value)}
                      />
                    </div>
                    <div className="title-v1">
                      <i class="fa fa-user"> &nbsp;</i>
                      email:
                      <input
                        className="value-v1"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="title-v1">
                      <i class="fa fa-user"> &nbsp;</i>
                      Địa chỉ:
                      <input
                        className="value-v1"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="openModalBtn-up" type="submit">
                Cập nhật
              </button>
              {modalUp && <Update setUpModal={setModalUp} />}
            </div>
          </form>
        ) : null}
      </div>
      <div className="panel">QUẢN LÝ NHÂN VIÊN</div>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
          setView([]);
        }}
      >
        Thêm mới
      </button>
      {modalOpen && <AddPersonnel setOpenModal={setModalOpen} />}
      {modalDele && <Delete setModalDele={setModalDele} idPersonnel={isDel} />}
      <table id="customers">
        <tr>
          <th>Hình ảnh</th>
          <th>Họ và tên</th>
          <th>Số điện thoại</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Trạng thái</th>
          <th>Chức năng</th>
        </tr>
        {listAllPersonnel != []
          ? listAllPersonnel.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <img
                      src={URLIMG + "avatars/" + val.img}
                      className="image-per"
                    ></img>
                  </td>
                  <td>{val.name}</td>
                  <td>{val.phoneNumber}</td>
                  <td>{val.email}</td>
                  <td>{val.address}</td>
                  <td>
                    {val.active == true ? (
                      <div>
                        <i style={{ color: "green" }} class="fas fa-circle"></i>{" "}
                        Online
                      </div>
                    ) : (
                      <div>
                        <i style={{ color: "gray" }} class="fas fa-circle"></i>{" "}
                        Offline
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      <button
                        className="dele"
                        onClick={() => {
                          setModalDele(true);
                          setDel(val);
                        }}
                      >
                        <i class="fa fa-trash" />
                        &nbsp; Xoá
                      </button>
                      &nbsp;
                      <button
                        className="dele"
                        onClick={() => {
                          setView(val);
                          setName(val.name);
                          setPN(val.phoneNumber);
                          setEmail(val.email);
                          setAddress(val.address);
                          setFile();
                        }}
                      >
                        <i class="fas fa-edit"></i>
                        &nbsp; Sửa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
};

export default Personnel;
