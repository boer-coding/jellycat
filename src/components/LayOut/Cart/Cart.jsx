import React from "react";
import { useSelector } from "react-redux";
import "./cart.css";
import "../../../font/iconfont.css"

export default function Cart({onClose}) {
  const { count } = useSelector((state) => state.counter);

  return (
    <div className="cart">
      <div className="cartContainer">
        <div className="cartTitle">
          <div className="myBag">My Bag</div>
          <div className="bagCount">{count} items</div>
          <div className="closeBag" onClick={onClose}><span className="iconfont icon-cross"></span></div>
        </div>
        <div className="cartContent"></div>
      </div>
    </div>
  );
}
