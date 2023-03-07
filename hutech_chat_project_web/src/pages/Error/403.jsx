import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/error/403.jpg";
import "../../styles/Error.css";

function Forbidden() {
  return (
    <div className="error">
      <img src={image} alt={"403 Forbidden"} onResize={true} />
    </div>
  );
}

export default Forbidden;
