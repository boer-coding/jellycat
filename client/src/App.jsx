import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {BannerProvider} from './helpers/MsgContext.js'
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
import { setAuthState } from "./store/modules/userStore.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


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
        const [bannerResponse, authResponse] = await Promise.all([
          fetchBannerData(),
          checkLoginStatus(),
        ]);
  
        if (bannerResponse.error) {
          setErrorBanner(bannerResponse.error);
        } else {
          setBannerData(bannerResponse.data);
        }
        setLoadingBanner(false);
  
        setIsLoggedIn(authResponse.isLoggedIn);
        setUserId(authResponse.userId);
  
        dispatch(
          setAuthState({
            isLoggedIn: authResponse.isLoggedIn,
            user: authResponse.isLoggedIn
              ? {
                  email: authResponse.email,
                  username: authResponse.username,
                  userId: authResponse.userId,
                }
              : null,
          })
        );

      } catch (error) {
        console.error("Error initializing app:", error);
      } 

    };
  
    initializeApp();
  }, [dispatch]);
  
  useEffect(() => {
    console.log("dispath is running in app.js");

    const fetchAndSetCart = async () => {
      try {
        let cart;
        if (isLoggedIn && userId) {
          console.log("fetchCartFromUser is running in app.js");

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
            <BannerProvider value={{ bannerData }}>
              <CentralizedRouter />{" "}
              {/* Show the CentralizedRouter when loading is done */}
            </BannerProvider>
          ) : (
            <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          height: "100vh", // Ensures the spinner is centered in the full viewport height
        }}
      >
        <CircularProgress size="3rem" />{" "}
      </Box>
          )}
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
