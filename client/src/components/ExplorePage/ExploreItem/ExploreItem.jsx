import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../helpers/syncCart";
import "./exploreItem.css";

export default function ExploreItem(props) {
  const size = "small";

  let { id, img, title, category, price } = props;
  const dispatch = useDispatch();

  const [bgColor, setBgColor] = useState("#33cee5"); // To manage the background color
  const [bagMsg, setBagMsg] = useState("Add to Bag");

  const handleAddToCart = () => {
    // Prepare the item object with necessary properties
    const item = {
      id,
      img,
      title,
      price,
      size,
    };

    // Dispatch the addToCart action with the item
    dispatch(addToCart(item));
  };
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
            handleAddToCart();
            handleChange();
          }}
        >
          {bagMsg}
        </div>
      </div>
    </div>
  );
}
