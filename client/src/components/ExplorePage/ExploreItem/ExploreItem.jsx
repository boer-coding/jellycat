import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment } from "../../../store/modules/counterStore";
import "./exploreItem.css";

export default function ExploreItem(props) {
  let { id, img, title, category, price } = props;
  const dispatch = useDispatch();

  const [bgColor, setBgColor] = useState("#33cee5"); // To manage the background color
  const [bagMsg, setBagMsg] = useState("Add to Bag");
  const handleChange = () => {
    setBagMsg("Adding to Bag");
    setBgColor("lightgray");
    setTimeout(() => {
      setBagMsg("Add to Bag");
      setBgColor("#33cee5");
    }, 500);
  };
  return (
    <div className="container">
      <Link
        to={`/products/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="itemContainer">
          <div className="itemImgContainer">
            <div
              className="itemImg"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
          <div className="itemInfo">
            <div className="itemTitle">{title}</div>
            <div className="itemCategory">{category}</div>
            <div className="itemPrice">{price}</div>
          </div>
        </div>
      </Link>
      <div className="addToContainer" style={{ backgroundColor: bgColor }}>
        <div
          onClick={() => {
            dispatch(increment({ id, img, title, price }));
            handleChange();
          }}
        >
          {bagMsg}
        </div>
      </div>
    </div>
  );
}
