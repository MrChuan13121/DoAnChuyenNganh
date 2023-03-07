import React, { useState } from "react";
import { useEffect } from "react";
import { ADDRESS, URLIMG } from "../../dotenv";
import "../../styles/Admin/AddPersonnel.css";

function AddPersonnel({ setOpenModal }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPN] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    creatPersonnel();
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const creatPersonnel = async (e) => {
    e.preventDefault();
    if (
      name != undefined &&
      phoneNumber != undefined &&
      email != undefined &&
      address != undefined
    ) {
      // const formdata = new FormData();
      // const tokenString = localStorage.getItem("token");
      // console.log({
      //   uri: file.uri,
      //   type: file.type,
      //   name: file.name,
      // });
      // formdata.append("name", name);
      // formdata.append("phoneNumber", phoneNumber);
      // formdata.append("email", email);
      // formdata.append("address",address);

      const per = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        role: "personnel",
        active: false,
        img: "123.jpeg",
        password: "123456",
        passwordConfirm: "123456",
      };

      await fetch(ADDRESS + "/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(per),
      })
        .then((reponse) => reponse.json())
        .then(async (dt) => {
          console.log(dt);
          setOpenModal(false);
          // setData(dt);
          // if (dt.message) {
          //   setOpenModal(false);
          // }
        });
    } else {
      if (name == undefined) {
        setData({ name: "Vui lòng nhập họ tên dịch vụ" });
      } else if (phoneNumber == undefined) {
        setData({ phoneNumber: "Vui lòng nhập số điện thoại" });
      } else if (email == undefined) {
        setData({ email: "Vui lòng nhập địa chỉ email" });
      } else if (address == undefined) {
        setData({ address: "Vui lòng địa chỉ" });
      }
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer-per">
        <form className="form-per" onSubmit={creatPersonnel}>
          <div className="tit-per">THÔNG TIN NHÂN VIÊN</div>
          <div className="sum-per">
            {/* <div className="img-per">
              {file ? (
                <img src={file.preview} className="image-book"></img>
              ) : null}
              {data.img != "" ? (
                <text className="error">{data.img}</text>
              ) : null}
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div> */}
            <div className="fo-per">
              <div className="row-per">
                <div className="row-name-per">Họ và tên: </div>
                <div className="row-input-per">
                  <input
                    className="input-per"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row-per">
                <div className="row-name-per">Số điện thoại: </div>
                <div className="row-input-per">
                  <input
                    className="input-per"
                    type="number"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPN(e.target.value)}
                  />
                </div>
              </div>
              <div className="row-per">
                <div className="row-name-per">Email: </div>
                <div className="row-input-per">
                  <input
                    className="input-per"
                    type="emai;"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row-per">
                <div className="row-name-per">Địa chỉ: </div>
                <div className="row-input-per">
                  <input
                    className="input-per"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="btt-sub-per" type="submit">
            Tạo mới
          </button>
          <button
            className="btt-can-per"
            type="cancel"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Huỷ bỏ
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPersonnel;
