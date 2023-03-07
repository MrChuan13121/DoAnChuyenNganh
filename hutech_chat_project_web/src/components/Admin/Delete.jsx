import React, { useEffect } from "react";
import "../../styles/Admin/Delete.css";
import { ADDRESS } from "../../dotenv";

function Delete({ setModalDele, idService }) {
  const deleteService = async (idService) => {
    const tokenString = localStorage.getItem("token");
    await fetch(ADDRESS + "deleteService/" + idService, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenString,
      },
    })
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="modalBackground-del">
      <div className="modalContainer-del">
        <div className="body">Bạn có chắc chắn muốn xoá không?</div>
        <div className="footer">
          <button
            onClick={() => {
              setModalDele(false);
            }}
            id="cancelBtn-del"
          >
            Huỷ
          </button>
          <button
            onClick={async () => {
              await deleteService(idService._id);
              setModalDele(false);
            }}
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
