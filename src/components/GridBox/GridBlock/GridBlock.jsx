import React from "react";
import "./gridBlock.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../../store/modules/counterStore";
import { useNavigate } from "react-router";

export default function GridBlock(props) {
  let { id, img, title, price, pics } = props;
  const size = "small";
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setCartFade(""); // Remove fade class
    setCartPrice("cartPrice"); // Apply price-related class
  };

  const handleCartOut = () => {
    setCartFade("fadeCart"); // Apply fade class
    setCartPrice(""); // Remove price-related class
  };

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
      <div className="toyImgContainer">
        <div
          className={`toyImg ${fadeClass}`}
          style={{ backgroundImage: `url(${currentImg})` }}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={() => {
            navigate(`/products/${id}`);
          }}
        ></div>
      </div>

      <div className="toyInfo">
        <div
          className="toyTitle"
          onClick={() => {
            navigate(`/products/${id}`);
          }}
        >
          {title}
        </div>

        <div className="displayEither">
          <div className={`toyPirce ${cartPrice}`}>{price}</div>
          <div
            className={`addToContainer ${cartFade}`}
            style={{ backgroundColor: bgColor }}
          >
            <div
              onClick={() => {
                dispatch(increment({ id, img, title, price, size }));
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
