import React from "react";
import "./navBar.css"; // Import the CSS file
import "../../image/font/iconfont.css"

export default function navBar() {
  const navItems = ["Home", "Shop", "Featured", "Recommended"];

  return (
    <div className="navBar">
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      <div className="navBarLink">
        <ul className="navBarItems">
          {navItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="navSearchContainer">
        <div className="navSearchInput">
          <input
            className="navInputBox"
            type="text"
            placeholder="Search Product"
          />
        </div>
        <div className="navSearchCart"><span className="iconfont icon-gouwudai_o"></span></div>
      </div>
      <div className="navTabContainer">
        <div className="navTab navTabUp">Sign Up</div>
        <div className="navTab navTabIn">Sign In</div>
      </div>
    </div>
  );
}
