import React from "react";
import "./gridBlock.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../../store/modules/counterStore";

export default function GridBlock(props) {
  let { id, img, title, price, pics } = props;

  const [currentImg, setCurrentImg] = useState(img);
  const [fadeClass, setFadeClass] = useState("");
  const handleMouseEnter = () => {
    if (pics?.default?.side) {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentImg(pics.default.side);
        setFadeClass("");
      }, 300);
    }
  };
  const handleMouseLeave = () => {
    setCartFade("");
    setTimeout(() => {
      setCurrentImg(img);
      setFadeClass("");
    }, 300);
  };
  const [cartFade, setCartFade] = useState("fadeCart");
  const [cartPrice, setCartPrice] = useState("");

  const handleCartIn = () => {
    setCartFade("");  // Remove fade class
    setCartPrice("cartPrice");  // Apply price-related class
  };

  const handleCartOut = () => {
    setCartFade("fadeCart");  // Apply fade class
    setCartPrice("");  // Remove price-related class
  };

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
    <div
      className="productContainer"
      onMouseLeave={handleCartOut}
      onMouseEnter={handleCartIn}
    >
      <Link
        to={`/products/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="imgContainer">
          <div
            className={`toyImg ${fadeClass}`}
            style={{ backgroundImage: `url(${currentImg})` }}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          ></div>
        </div>
      </Link>
      <div className="toyInfo">
        <Link
          to={`/products/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="toyTitle">{title}</div>
        </Link>
        <div className="displayEither">
        <div className={`toyPirce ${cartPrice}`}>{price}</div>
        <div
          className={`addToContainer ${cartFade}`}
          style={{ backgroundColor: bgColor }}
        >
          <div
            onClick={() => {
              dispatch(increment());
              handleChange();
            }}
          >
            {bagMsg}
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
}
