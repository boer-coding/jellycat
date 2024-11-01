import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./menu.css";

export default function Menu({ onClose }) {
  const [type, setType] = useState("");

  const navigate = useNavigate();

  let goNew = () => {
    navigate("/newin");
  };

  let goExplore = () => {
    navigate("/explore");
  };

  let goBest = () => {
    navigate("/bestsellers");
  };

  let handleChange = (type) => {
    setType(type);
  };
  const tabs = [
    { type: "explore", text: "EXPLORE ALL", onClick: goExplore },
    { type: "new", text: "NEW IN", onClick: goNew },
    { type: "best", text: "BEST SELLER", onClick: goBest },
  ];
  return (
    <div className="menuContainer">
      <div className="closeMenu" onClick={onClose}>
        <span className="iconfont icon-chacha"></span>
      </div>
      <div className="menu">
        {tabs.map((item) => (
          <div
            key={item.type}
            className={`menuItem ${type === item.type ? "active" : ""}`}
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
  );
}
