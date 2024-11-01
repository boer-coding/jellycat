import "./App.css";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import CentralizedRouter from "./router/CentralizedRouter";
import ScrollToTop from "./components/Shared/ScrollTop/ScrollTop.jsx";
import { checkLoginStatus } from "./helpers/userRoutes/authUser.js"; // Import the function from auth.js
import { fetchBannerData } from "./helpers/bannersRoutes/fetchBanner.js";
import {
  fetchCartFromSession,
  fetchCartFromUser,
} from "./helpers/cartRoutes/fetchCart.js";
import { setCart } from "./store/modules/counterStore.js";

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

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
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
        setIsLoggedIn(authStatus.isLoggedIn);
        setUserId(authStatus.userId);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initializeApp();
  }, []);

  // Fetch the cart based on login status and userId
  useEffect(() => {
    console.log("dispath is running in app.js");
    const fetchAndSetCart = async () => {
      try {
        let cart;
        if (isLoggedIn && userId) {
          cart = await fetchCartFromUser(userId); // Fetch the cart from user collection
        } else {
          cart = await fetchCartFromSession(); // Fetch the cart from session
        }

        if (cart) {
          dispatch(setCart(cart)); // Dispatch setCart only if cart is not empty
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAndSetCart();
  }, [isLoggedIn, userId, dispatch]); // Include all relevant dependencies

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
