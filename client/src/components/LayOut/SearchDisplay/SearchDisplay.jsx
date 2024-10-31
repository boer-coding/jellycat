import React from "react";

import { Link } from "react-router-dom";
import "./searchDisplay.css";
export default function SearchDisplay(props) {
  const { id, img, price, title } = props;
  return (
    <div >
      <Link
        to={`/products/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="searchContainer">
        <div className="searchPicContainer">
          <div
            className="searchPic"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
        <div className="textContainer">
          <div className="searchTitle">{title}</div>
          <div className="searchPrice">{price}</div>
        </div>
        </div>
      </Link>
    </div>
  );
}
