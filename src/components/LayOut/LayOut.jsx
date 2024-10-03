import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import "./layOut.css";
import "../../font/iconfont.css";
import Cart from "./Cart/Cart";

export default function LayOut() {
  const { count } = useSelector((state) => state.counter);
  const { logo } = useSelector((state) => state.banner);
  const navigate = useNavigate();

  const [cartState, setCartState] = useState(false);
  const cartRef = useRef(null); // Ref to detect clicks outside the cart

  // Function to open cart (slide it into view)
  const handleCart = () => {
    if (cartRef.current) {
      cartRef.current.style.transform = "translateX(0px)"; // Slide cart into view
    }
    setCartState(true);
  };

  // Function to close cart (slide it out of view)
  const handleCloseCart = () => {
    if (cartRef.current) {
      cartRef.current.style.transform = "translateX(100%)"; // Slide the cart out of view
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
        <Cart onClose={handleCloseCart} /> {/* Pass the close handler to Cart */}
      </div>
      <div className="cartContainer"></div>
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
              style={{ backgroundImage: `url(${logo})` }}
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
            <div className="navSearchCart" onClick={handleCart}>
              <span className="iconfont icon-gouwudai_o"></span>
              {count !== 0 && <div className="displayCart">{count}</div>}
            </div>
          </div>
          <div className="navTabContainer">
            <div className="navTab navTabUp">Log In</div>
            <div className="navTab navTabIn">Sign Up</div>
          </div>
        </div>
        <Outlet />
        <div className="footerContainer">
          <div className="logoContainer" onClick={goHome}>
            <div
              className="logo"
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
