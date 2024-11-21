import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../store/modules/counterStore";
import CartItem from "./CartItem/CartItem";
import Pagination from "@mui/material/Pagination";
import { emptyCart } from "../../../helpers/cartRoutes/syncCart";
import "./cart.css";
import "../../../font/iconfont.css";

export default function Cart({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items to display per page
  const dispatch = useDispatch();

  const handleClearCart = ()=>{
    dispatch(emptyCart())
  }
  

  const { cartList, totalCount, totalCost } = useSelector(
    (state) => state.counterSlice
  );

  // Calculate the number of pages based on the total items and itemsPerPage
  const totalPages = Math.ceil(cartList.length / itemsPerPage);

  // Get the items for the current page
  const paginatedCartItems = cartList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    // Check if the current page is greater than the total pages, reset to 1 if so
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [cartList, currentPage, totalPages]);

  return (
    <div className="cart">
      <div className="cartContainer">
        <div className="cartTitle">
          <div className="myBag" >My Bag</div>
          <div className="bagCount">{totalCount} items</div>
          {cartList.length > 0 && (
            <div className="clearCart" onClick={handleClearCart}>
              <span className="iconfont icon-trash"></span>
            </div>
          )}
          <div className="closeBag" onClick={onClose}>
            <span className="iconfont icon-chacha"></span>
          </div>
        </div>

        <div className="cartContent">
          {paginatedCartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}`}
              id={item.id}
              img={item.img}
              price={item.price}
              size={item.size}
              title={item.title}
              cost={item.cost}
              count={item.count}
            />
          ))}
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="paginationContainer">
            <Pagination
              count={totalPages} // Total number of pages
              page={currentPage} // Current page number
              onChange={handlePageChange} // Handle page change
              color="primary" // You can customize the color
            />
          </div>
        )}

        <div className="cartBottom">
          <div className="total">
            Total: <span className="totalCost">{totalCost}</span>
          </div>
          <div className="checkOut">CHECK OUT</div>
        </div>
      </div>
    </div>
  );
}
