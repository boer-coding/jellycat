import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useBanner } from "../../App.jsx";
import Cart from "../Shared/Cart/Cart.jsx";

import "./layOut.css";
import "../../font/iconfont.css";
import "../../font2/iconfont.css";



export default function LayOut() {
  const { count } = useSelector((state) => state.counterSlice);
  const { bannerData } = useBanner(); // Access banner data from context

  const navigate = useNavigate();

  const [cartState, setCartState] = useState(false);
  const cartRef = useRef(null); // Ref to detect clicks outside the cart
  const darken = useRef(null);

  // Function to open cart (slide it into view)
  const handleCart = () => {
    if (cartRef.current && darken.current) {
      console.log(darken.current.style);

      cartRef.current.style.transform = "translateX(0px)"; // Slide cart into view
      darken.current.style.visibility = "visible";

      darken.current.style.opacity = "1";
    }
    setCartState(true);
  };

  // Function to close cart (slide it out of view)
  const handleCloseCart = () => {
    if (cartRef.current) {
      cartRef.current.style.transform = "translateX(100%)"; // Slide the cart out of view
      darken.current.style.visibility = "hidden";

      darken.current.style.opacity = "0";
    }
    setCartState(false);
  };

  // Detect clicks outside the cart and close the cart
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      handleCloseCart(); // Close cart on outside click
    }
  };

  // Add event listener when cartState is true and remove it when it's false
  useEffect(() => {
    if (cartState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount or when cartState changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartState]); // Run this effect when cartState changes

  let goHome = () => {
    navigate("/");
  };

  let goNew = () => {
    navigate("/newin");
  };

  let goExplore = () => {
    navigate("/explore");
  };

  let goBest = () => {
    navigate("/bestsellers");
  };

  let logIn = () =>{
    navigate("/login");
  }

  const [type, setType] = useState("");

  let handleChange = (type) => {
    setType(type);
  };

  const tabs = [
    { type: "explore", text: "EXPLORE ALL", onClick: goExplore },
    { type: "new", text: "NEW IN", onClick: goNew },
    { type: "best", text: "BEST SELLER", onClick: goBest },
  ];

  return (
    <div className="layOut">
      <div ref={cartRef} className="shoppingCart">
        <Cart onClose={handleCloseCart} />{" "}
      </div>
      <div className="darken" ref={darken}></div>

      {/* <div className="cartContainer"></div> */}
      <div className="mainLayOut">
        <div className="navBar">
          <div
            className="logoContainer"
            onClick={() => {
              goHome();
              handleChange("");
            }}
          >
            <div
              className="logo"
              style={{ backgroundImage: `url(${bannerData.logo})` }}
            ></div>
          </div>
          <div className="navBarLink">
            <div className="navBarLinkContainer">
              {tabs.map((item) => (
                <div
                  key={item.type}
                  className={`navBarItem ${type === item.type ? "active" : ""}`}
                  onClick={() => {
                    item.onClick();
                    handleChange(item.type);
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="navSearchContainer">
            <div className="navSearchInput">
              <input
                className="navInputBox"
                type="text"
                placeholder="Search Product"
              />
              <div className="iconSearch">
                <span className="iconfont icon-search"></span>
              </div>
            </div>
          </div>
          <div className="navTabContainer">
            <div className="navIcon navLog">
              <span className="iconfont icon-custom-user" onClick={logIn}></span>
            </div>
            <div className="navIcon navCart" onClick={handleCart}>
              <span className="iconfont icon-gouwudai_o"></span>
              {count !== 0 && <div className="displayCart">{count}</div>}
            </div>
          </div>
        </div>
        <div className="mid">
          <Outlet />
        </div>
        <div className="footerContainer">
          <div className="logoContainer" onClick={goHome}>
            <div
              className="logo"
              style={{ backgroundImage: `url(${bannerData.logo})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
