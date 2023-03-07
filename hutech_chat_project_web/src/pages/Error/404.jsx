import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/error/404.jpg";
import "../../styles/Error.css";

function NotFound() {
  return (
    <div className="error">
      <img src={image} alt={"404 Not Found"} onResize={true} />
    </div>
  );
}

export default NotFound;
