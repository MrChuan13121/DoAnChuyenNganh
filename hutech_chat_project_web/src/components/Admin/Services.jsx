import React, { useState, useEffect } from "react";
import "../../styles/Admin/Services.css";
import Delete from "../../components/Admin/Delete";
import AddService from "./AddService";
import Update from "./Update";
import { ADDRESS, URLIMG } from "../../dotenv";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDele, setModalDele] = useState(false);
  const [modalUp, setModalUp] = useState(false);
  const [isView, setView] = useState([]);
  const [isDel, setDel] = useState([]);
  const [listServiceAll, setListServiceAll] = useState([]);
  const [listService, setListService] = useState([]);
  const [pageCurren, setPageCurren] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [file, setFile] = useState();
  const [nameService, setNameService] = useState(isView.name);
  const [priceService, setPriceService] = useState(isView.price);
  const [data, setData] = useState({
    img: "",
    price: "",
    name: "",
    message: "",
  });

  console.log(isView);
  useEffect(() => {
    getAllService();
  }, [modalOpen, modalDele, modalUp, isView]);

  const page = async (pageCurren, pageSize) => {
    console.log(pageCurren);
    const listSV = listServiceAll.slice(pageCurren, pageSize + 1);
    setListService(listSV);
  };

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
        page(pageCurren, pageSize);
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

  const updateService = async (e) => {
    e.preventDefault();
    if (nameService != "" && priceService != "") {
      const formdata = new FormData();
      const tokenString = localStorage.getItem("token");
      formdata.append("name", nameService);
      if (file != undefined) {
        formdata.append("image", file);
      }
      formdata.append("img", isView.img);
      formdata.append("price", priceService);
      formdata.append("active", isView.active);

      await fetch(ADDRESS + "updateService/" + isView._id, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenString,
        },
        body: formdata,
      })
        .then((reponse) => reponse.json())
        .then(async (dt) => {
          console.log(dt);
          if (dt.code == 200) {
            setView([]);
          } else if (dt.code == 500) {
            alert(dt.message + "\n" + dt.error);
            setView([]);
          }
        });
    } else {
      if (nameService == "") {
        setData({ name: "Vui lòng nhập tên dịch vụ" });
        setView([]);
      } else if (priceService == "") {
        setData({ price: "Vui lòng nhập giá tiền" });
        setView([]);
      }
    }
  };

  return (
    <div className="containerPatient">
      <div>
        {isView.length != 0 ? (
          <div className="info-p">
            <form onSubmit={updateService}>
              <div className="user-Details">
                <div className="header">
                  <div className="panel">THÔNG TIN DỊCH VỤ</div>
                  <button
                    onClick={() => {
                      setView([]);
                    }}
                    className="exit"
                  >
                    x
                  </button>
                </div>
                <hr />

                <div className="form-update">
                  <div className="user-image-ser">
                    {file ? (
                      <img src={file.preview} className="image-book"></img>
                    ) : (
                      <img
                        src={URLIMG + "services/" + isView.img}
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

                  <div className="user-left-ser">
                    <div style={{ width: "100%" }}>
                      <div className="title-v1">
                        Tên dịch vụ
                        <input
                          className="value-v1"
                          type="text"
                          value={nameService}
                          onChange={(e) => setNameService(e.target.value)}
                        />
                      </div>
                      <div className="title-v1">
                        Giá tiền:
                        <input
                          className="value-v1"
                          type="text"
                          Value={priceService}
                          onChange={(e) => setPriceService(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="openModalB-upSV">
                <button className="openModalBtn-upSV" type="submit">
                  Cập nhật
                </button>
              </div>
              {modalUp && <Update setUpModal={setModalUp} />}
            </form>

            <hr />
          </div>
        ) : null}
      </div>
      <div className="panel">QUẢN LÝ DỊCH VỤ</div>
      <button
        className="openModalBtn-ser"
        onClick={() => {
          setModalOpen(true);
          setView([]);
        }}
      >
        Thêm mới
      </button>
      {modalOpen && <AddService setOpenModal={setModalOpen} />}
      {modalDele && <Delete setModalDele={setModalDele} idService={isDel} />}
      <table id="customers">
        <tr>
          <th>Hình ảnh</th>
          <th>Tên dịch vụ</th>
          <th>Giá</th>
          <th>Chức năng</th>
        </tr>
        {listServiceAll.map((val, key) => {
          return (
            <tr key={key}>
              <td>
                <img
                  src={URLIMG + "services/" + val.img}
                  className="image-ser"
                ></img>
              </td>
              <td>{val.name}</td>
              <td>{val.price}</td>

              <td className="icon">
                <div>
                  <button
                    className="deleted"
                    onClick={async () => {
                      setModalDele(true);
                      setDel(val);
                    }}
                  >
                    <i class="fa fa-trash" />
                    &nbsp; Xoá
                  </button>
                  &nbsp;
                  <button
                    className="deleted"
                    onClick={() => {
                      setView(val);
                      setNameService(val.name);
                      setPriceService(val.price);
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
        })}
      </table>
    </div>
  );
};

export default Services;
