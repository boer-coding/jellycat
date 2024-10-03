import React from "react";
import "./banner.css"; // Import the CSS file
import "../../font/iconfont.css";
import { Link } from "react-router-dom";

export default function Banner(props) {
  const bcgImg = props.bcgImg;
  const header = props.header;
  const text = props.text;

  return (
    <div className="header">
      <div
        className="headerContainer"
        style={{ backgroundImage: `url(${bcgImg})` }}
      >
        <div className="header">
          <div className="headerTitle">{header}</div>
          <div className="headerText">{text}</div>
        </div>
      </div>
    </div>
  );
}
