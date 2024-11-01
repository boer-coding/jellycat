import React, { useState, useEffect } from "react";
import UserInformation from "./UserInformation";
import UserLikes from "./UserLikes";
import UserOrders from "./UserOrders";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { fetchCartFromUser } from "../../../helpers/cartRoutes/fetchCart";
import { setCart } from "../../../store/modules/counterStore";
import { useLocation } from "react-router-dom";
const Dashboard = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("info");
  const location = useLocation();
  const { email, username, userId } = location.state || {};  // Access user information


  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispath is running in Dash.js");

    const fetchAndSetCart = async () => {
      try {
        let cart = await fetchCartFromUser(userId); // Fetch the cart from user collection

        if (cart) {
          dispatch(setCart(cart)); // Dispatch setCart only if cart is not empty
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAndSetCart();
  }, [dispatch]); // Include all relevant dependencies

  // Function to render the correct component based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <UserInformation email={email} username = {username}/>;
      case "likes":
        return <UserLikes />;
      case "orders":
        return <UserOrders />;
      default:
        return <UserInformation />;
    }
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          User Information
        </button>
        <button
          className={activeTab === "likes" ? "active" : ""}
          onClick={() => setActiveTab("likes")}
        >
          User Likes
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          User Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
