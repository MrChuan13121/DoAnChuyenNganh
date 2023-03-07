import React from "react";
import "../../styles/Admin/Services.css";
import * as FaIcons from "react-icons/fa";
import image1 from "../../assets/images/admin/services/z3912938109795_4d0c5de02cee3f30f3178c451a68305e.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { URL } from "../../dotenv";

const Reports = () => {
  const [listServiceAll, setListServiceAll] = useState([]);
  const [listService, setListService] = useState([]);
  const [pageCurren, setPageCurren] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  console.log(listService.length);
  useEffect(() => {
    getAllService();
  }, []);

  const page = async (pageCurren, pageSize) => {
    console.log(pageCurren);
    const listSV = listServiceAll.slice(pageCurren, pageSize + 1);
    setListService(listSV);
  };

  const getAllService = async () => {
    await fetch(URL + "allServices", {
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

  return (
    <div className="containerServices">
      <div className="add">
        <FaIcons.FaPlus
          style={{
            color: "white",
            paddingLeft: 10,
            marginRight: 20,
            fontSize: 20,
          }}
        ></FaIcons.FaPlus>
        <text> Thêm mới dịch vụ </text>
      </div>
      <div className="contentsv">
        <div className="nameColumn">
          <div className="column">Tên dịch vụ</div>
          <div className="column">Hình ảnh</div>
          <div className="column">Ngày tạo</div>
          <div className="column">Chức năng</div>
        </div>
        <div className="itemsv">
          {listServiceAll.length != 0
            ? listServiceAll.map((item) => {
                <div className="row">
                  <div className="item">{item.name}</div>
                  <div className="item">
                    <img src={image1} height={60} />
                  </div>
                  <div className="item">23/11/2022</div>
                  <div className="item">
                    <div className="delete">
                      <FaIcons.FaTrash />
                    </div>
                    &emsp;
                    <div className="update">
                      <FaIcons.FaPencilAlt />
                    </div>
                  </div>
                </div>;
              })
            : null}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default Reports;
