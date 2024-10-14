import {
  increment,
  decrement
} from "../../../../store/modules/counterStore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./cartItem.css";
import React from "react";

export default function CartItem(props) {
  const { id , size} = props;

  const { cartList } = useSelector((state) => state.counterSlice);
  const listItem = cartList.find((item) => item.id === id && item.size === size);
  const { img, title, count, price, totalPrice } = listItem;
  const dispatch = useDispatch();

  return (
    <div className="cartItemCotainer">
      <div className="changeCount">
        <div className="increment">
          <span
            className="iconfont icon-jiantou-copy-copy-copy"
            onClick={() => {
              dispatch(increment({ id, img, title, price , size}));
            }}
          ></span>
        </div>
        <div className="cartCount">{count}</div>
        <div className="decrement">
          <span
            className="iconfont icon-jiantou-copy-copy"
            onClick={() => {
              dispatch(decrement({ id, img, title, price ,size}));
            }}
          ></span>
        </div>
      </div>
      <div className="cartImg" style={{ backgroundImage: `url(${img})` }}></div>

      <div className="midDisplay">
      <Link
          to={`/products/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="cartTitle">{title}</div>
        </Link>
        <div className="cartSize"> Size: {size}</div>
      </div>

      <div className="cartPrice">{totalPrice}</div>
    </div>
  );
}
