import React from "react";
import {useSelector } from "react-redux";
import "./cart.css";
import "../../../font/iconfont.css";
import CartItem from "./CartItem/CartItem";
export default function Cart({ onClose }) {
  const { count, cost, cartList } = useSelector((state) => state.counterSlice);

  return (
    <div className="cart">
      <div className="cartContainer">
        <div className="cartTitle">
          <div className="myBag">My Bag</div>
          <div className="bagCount">{count} items</div>
          <div className="closeBag" onClick={onClose}>
            <span className="iconfont icon-cross"></span>
          </div>
        </div>

        <div className="cartContent">
          {cartList.map((item) => (
            (<CartItem key={item.id} 
            id = {item.id}
            size = {item.size}
           />)
          ))}
        </div>
        <div className="cartBottom">
          <div className="total">
            Total: <span className="totalCost">{cost}</span>
          </div>
          <div className="checkOut">CEHCK OUT</div>
        </div>
      </div>
    </div>
  );
}
