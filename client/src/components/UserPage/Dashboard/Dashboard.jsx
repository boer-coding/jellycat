import React, { useState, useEffect } from "react";
import UserInformation from "./UserInformation";
import UserOrders from "./UserOrders";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromUser } from "../../../helpers/cartRoutes/fetchCart";
import { setCart } from "../../../store/modules/counterStore";

// import { useLocation } from "react-router-dom";
const Dashboard = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("info");

  const { isLoggedIn, user, loadingAuth } = useSelector(
    (state) => state.userSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingAuth || !isLoggedIn || !user) return;

    const fetchAndSetCart = async () => {
      try {
        const cart = await fetchCartFromUser(user.userId);
        if (cart) {
          dispatch(setCart(cart));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAndSetCart();
  }, [loadingAuth, isLoggedIn, user, dispatch]);

  // Function to render the correct component based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <UserInformation id = {user.userId} email={user.email} username={user.username} />;
      case "orders":
        return <UserOrders />;
      default:
        return <UserInformation />;
    }
  };

  return (
    <div className="dashboard">

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          User Information
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
