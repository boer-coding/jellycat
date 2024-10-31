import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeCart } from "../../../../helpers/syncCart";
import "./cartItem.css";

export default function CartItem(props) {
  const { id, img, price, size, title, cost, count } = props;

  const dispatch = useDispatch();
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

  const handleRemoveCart = () => {
    // Prepare the item object with necessary properties
    const item = {
      id,
      img,
      title,
      price,
      size,
    };

    // Dispatch the addToCart action with the item
    dispatch(removeCart(item));
  };
  return (
    <div className="cartItemCotainer">
      <div className="changeCount">
        <div className="increment">
          <span
            className="iconfont icon-jiantou-copy"
            onClick={() => {
              handleAddToCart();
            }}
          ></span>
        </div>
        <div className="cartCount">{count}</div>
        <div className="decrement">
          <span
            className="iconfont icon-jiantou"
            onClick={() => {
              handleRemoveCart();
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

      <div className="cartPrice">{cost}</div>
    </div>
  );
}
