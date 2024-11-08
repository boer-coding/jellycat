import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import Pagination from "@mui/material/Pagination";
import "./cart.css";
import "../../../font/iconfont.css";

export default function Cart({ onClose }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items to display per page


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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="cart">
      <div className="cartContainer">
        <div className="cartTitle">
          <div className="myBag">My Bag</div>
          <div className="bagCount">{totalCount} items</div>
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
