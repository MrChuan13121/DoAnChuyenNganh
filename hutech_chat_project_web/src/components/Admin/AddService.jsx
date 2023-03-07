import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ADDRESS } from "../../dotenv";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin/AddService.css";

function AddService({ setOpenModal }) {
  const [file, setFile] = useState();
  const [nameService, setNameService] = useState();
  const [priceService, setPriceService] = useState();
  const [data, setData] = useState({
    img: "",
    price: "",
    name: "",
    message: "",
  });
  console.log(data);

  useEffect(() => {
    creatService();
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, []);

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
  async function creatService(e) {
    e.preventDefault();
    if (
      file != undefined &&
      nameService != undefined &&
      priceService != undefined
    ) {
      const formdata = new FormData();
      const tokenString = localStorage.getItem("token");
      console.log({
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      formdata.append("name", nameService);
      formdata.append("image", file);
      formdata.append("price", priceService);

      await fetch(ADDRESS + "createService", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenString,
        },
        body: formdata,
      })
        .then((reponse) => reponse.json())
        .then(async (dt) => {
          setData(dt);
          if (dt.message) {
            setOpenModal(false);
          }
        });
    } else {
      if (nameService == undefined) {
        setData({ name: "Vui lòng nhập tên dịch vụ" });
      } else if (priceService == undefined) {
        setData({ price: "Vui lòng nhập giá tiền" });
      } else {
        setData({ img: "Vui lòng chọn file hình" });
      }
    }
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer-ser">
        <form className="form-ser" onSubmit={creatService}>
          <div className="tit-ser">THÔNG TIN DỊCH VỤ</div>
          <div className="sum-ser">
            <div className="img-ser">
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
            </div>
            <div className="fo-ser">
              <div className="row-ser-1">
                <div className="row-name-ser">Tên dịch vụ: </div>
                <div className="row-input-ser">
                  {data.name != "" ? (
                    <text className="error">{data.name}</text>
                  ) : null}
                  <input
                    className="input-ser"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập tên dịch vụ"
                    onChange={(e) => setNameService(e.target.value)}
                  />
                </div>
              </div>
              <div className="row-ser-2">
                <div className="row-name-ser">Giá tiền: </div>
                <div className="row-input-ser">
                  {data.price != "" ? (
                    <text className="error">{data.price}</text>
                  ) : null}
                  <input
                    className="input-ser"
                    type="text"
                    id="text"
                    name="text"
                    placeholder="Vui lòng nhập giá tiền"
                    onChange={(e) => setPriceService(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="activeAddService">
            <button className="btt-sub-ser" type="submit">
              Tạo mới
            </button>
            <button
              className="btt-can-ser"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Huỷ bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddService;
