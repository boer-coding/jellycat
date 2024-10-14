import "./App.css";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "./store/modules/productStore.js";
import CentralizedRouter from "./router/CentralizedRouter";
import ScrollToTop from "./components/Shared/ScrollTop/ScrollTop.jsx";

// Create the BannerContext
const BannerContext = createContext();

// Custom hook to consume the context
export const useBanner = () => useContext(BannerContext);

function App() {

  const [bannerData, setBannerData] = useState(null);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [errorBanner, setErrorBanner] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/banners');
        console.log("Banner data fetched:", response.data);
        setBannerData(response.data[0]);
        setLoadingBanner(false);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setErrorBanner("Failed to fetch banner data");
        setLoadingBanner(false);
      }
    };

    fetchBannerData();
  }, []); 

  const dispatch = useDispatch();
  const productLoading = useSelector((state) => state.productSlice.loading);

  const loading = productLoading || loadingBanner;

  useEffect(() => {
    console.log("banner");
    dispatch(loadProduct());
  }, [dispatch]);

  console.log("loading ", loading);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          {!loading ? (
            <BannerContext.Provider value={{ bannerData}}>
              <CentralizedRouter /> {/* Show the CentralizedRouter when loading is done */}
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
