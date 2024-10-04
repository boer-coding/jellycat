import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadBanner } from "./store/modules/bannerStore.js";
import { loadProduct } from "./store/modules/productStore.js";

// import RouterMessage from './router/RouterMessage/RouterMessage';
import CentralizedRouter from "./router/CentralizedRouter";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
function App() {
  // First Mount: When the App component is mounted for the first time, the useEffect runs and triggers the API calls (dispatches loadBanner and loadProduct).

  // Re-renders: If the App component re-renders but isn’t unmounted, the useEffect will not run again because the dispatch function (in the dependency array) doesn’t change between renders. The dispatch function is provided by Redux and is stable, meaning it won't change across renders.

  // Unmounting and Remounting: If the App component is unmounted (e.g., navigating away from the route that contains the App component) and then later remounted (e.g., navigating back to the route), the useEffect will run again. This is because useEffect runs every time a component is mounted.

  const dispatch = useDispatch();

  useEffect(() => {

    // dispatch(loadBanner(`${jsonUrl}`));
    dispatch(loadProduct());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          {/* <NavBar /> */}
          {/* <RouterMessage /> */}
          <CentralizedRouter />
        </ScrollToTop>
      </BrowserRouter>

      {/* <ReduxHome></ReduxHome> */}
    </div>
  );
}

export default App;
