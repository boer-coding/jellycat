import React from "react";
import "./glassBlock.css";

export default function GlassBlock(props) {
  let { img, title, text } = props;
  return (
    <div className="glassContainer">
      <div className="glassImgContainer">
        <div
          className="glassImg"
          // style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>

      <div className="glassInfo">
        <div className="glassTitle">{title}</div>
        <div className="glassText">{text}</div>
      </div>
    </div>
  );
}
