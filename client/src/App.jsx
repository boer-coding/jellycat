import "./App.css";
import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CentralizedRouter from "./router/CentralizedRouter";
import ScrollToTop from "./components/Shared/ScrollTop/ScrollTop.jsx";
import { checkLoginStatus } from "./helpers/auth.js"; // Import the function from auth.js
import { fetchBannerData } from "./helpers/fetchBanner.js";
import {syncCartWithUser} from "./helpers/syncCartWithUser.js"
import { useSelector } from "react-redux";
// Create the BannerContext
const BannerContext = createContext();

// Custom hook to consume the context
export const useBanner = () => useContext(BannerContext);

function App() {
  const [bannerData, setBannerData] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [errorBanner, setErrorBanner] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Ensure setUserId is defined correctly

  const { cartList } = useSelector((state) => state.counterSlice);


  useEffect(() => {
    const initializeApp = async () => {
      // Fetch banner data
      const { data, error } = await fetchBannerData();
      if (error) {
        setErrorBanner(error);
      } else {
        setBannerData(data);
      }
      setLoadingBanner(false);

      // Check login status
      const authStatus = await checkLoginStatus();
      setIsLoggedIn(authStatus.isLoggedIn); // Update the login state
      setUserId(authStatus.userId);
    };

    initializeApp(); // Initialize the app on component mount
  }, []);

  if (isLoggedIn) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userId", userId);
  }

  useEffect(() => {
    const syncCart = async () => {
      if (isLoggedIn) {

        await syncCartWithUser(userId, cartList);
        fetch("https://jellycat-backend-14f22f6178c9.herokuapp.com/clearSessionCart", {
          method: "POST",
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Session cart cleared");
            }
          })
          .catch((error) => {
            console.error("Error clearing seesion");
          });
      } 
    };

    syncCart(); // Initialize the app on component mount
  }, [isLoggedIn]);
  // Log outputs
  console.log("isLoggedIn", sessionStorage.getItem("isLoggedIn"));
  // console.log("loadingBanner", loadingBanner);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          {!loadingBanner ? (
            <BannerContext.Provider value={{ bannerData }}>
              <CentralizedRouter />{" "}
              {/* Show the CentralizedRouter when loading is done */}
            </BannerContext.Provider>
          ) : (
            <div></div> // You can replace this with a spinner or a loading component
          )}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
