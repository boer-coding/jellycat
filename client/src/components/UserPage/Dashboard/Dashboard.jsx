import React, { useState } from "react";
import UserInformation from "./UserInformation";
import UserLikes from "./UserLikes";
import UserOrders from "./UserOrders";
import "./dashboard.css";

const Dashboard = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("info");

  // Function to render the correct component based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <UserInformation />;
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
