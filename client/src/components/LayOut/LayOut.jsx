import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useBanner } from "../../App.jsx";
import Cart from "../Shared/Cart/Cart.jsx";
import debounce from "lodash/debounce"; // For debouncing search
import SearchDisplay from "./SearchDisplay/SearchDisplay.jsx";
import "./layOut.css";
import "../../font/iconfont.css";

export default function LayOut() {
  const [cartState, setCartState] = useState(false);
  const { totalCount } = useSelector((state) => state.counterSlice);
  const { bannerData } = useBanner(); // Access banner data from context
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(true);

  const cartRef = useRef(null); // Ref to detect clicks outside the cart
  const darken = useRef(null);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check login status

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value); // Call debounced search function
  };

  // Debounced search function to limit API calls

  const debouncedSearch = debounce(async (query) => {
    if (query) {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`https://jellycat-backend-14f22f6178c9.herokuapp.com/search?q=${query}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.products); // Update search results
        } else {
          console.error("Error fetching search results");
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, 900);

  // Function to open cart (slide it into view)
  const handleCart = () => {
    if (cartRef.current && darken.current) {
      cartRef.current.style.transform = "translateX(0px)"; // Slide cart into view
      darken.current.style.visibility = "visible";
      darken.current.style.opacity = "1";
    }
    setCartState(true);
  };

  // Function to close cart (slide it out of view)
  const handleCloseCart = () => {
    if (cartRef.current) {
      cartRef.current.style.transform = "translateX(100%)"; // Slide the cart out of view
      darken.current.style.visibility = "hidden";

      darken.current.style.opacity = "0";
    }
    setCartState(false);
  };

  // Detect clicks outside the cart and close the cart
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      handleCloseCart(); // Close cart on outside click
    }
  };

  // Add event listener when cartState is true and remove it when it's false
  useEffect(() => {
    if (cartState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount or when cartState changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartState]); // Run this effect when cartState changes

  let goHome = () => {
    navigate("/");
  };

  let goNew = () => {
    navigate("/newin");
  };

  let goExplore = () => {
    navigate("/explore");
  };

  let goBest = () => {
    navigate("/bestsellers");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://jellycat-backend-14f22f6178c9.herokuapp.com/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        // Clear sessionStorage
        sessionStorage.removeItem("isLoggedIn");

        // Optionally redirect to the login page or home page
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const logIn = () => {
    // Check if the sessionStorage key 'isLoggedIn' exists and is set to 'true'

    if (isLoggedIn) {
      // Redirect the user to the dashboard if logged in
      navigate("/dashboard");
    } else {
      // Redirect to login page or handle the logic
      navigate("/login");
    }
  };

  const [type, setType] = useState("");

  let handleChange = (type) => {
    setType(type);
  };

  const tabs = [
    { type: "explore", text: "EXPLORE ALL", onClick: goExplore },
    { type: "new", text: "NEW IN", onClick: goNew },
    { type: "best", text: "BEST SELLER", onClick: goBest },
  ];

  return (
    <div className="layOut">
      <div ref={cartRef} className="shoppingCart">
        <Cart onClose={handleCloseCart} />{" "}
      </div>
      <div className="darken" ref={darken}></div>

      {/* <div className="cartContainer"></div> */}
      <div className="mainLayOut">
        <div className="navBar">
          <div
            className="logoContainer"
            onClick={() => {
              goHome();
              handleChange("");
            }}
          >
            <div
              className="logo"
              style={{ backgroundImage: `url(${bannerData.logo})` }}
            ></div>
          </div>
          <div className="navBarLink">
            <div className="navBarLinkContainer">
              {tabs.map((item) => (
                <div
                  key={item.type}
                  className={`navBarItem ${type === item.type ? "active" : ""}`}
                  onClick={() => {
                    item.onClick();
                    handleChange(item.type);
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="navSearchContainer">
            <div className="navSearchInput">
              <input
                className="navInputBox"
                type="text"
                placeholder="Search Product"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="iconSearch">
                <span className="iconfont icon-sousuo"></span>
              </div>
            </div>

            {searchTerm.length !== 0 && (
              <div className="searchDisplay">
                {loading ? (
                  <div></div> // Show loading message while search is in progress
                ) : searchResults.length !== 0 ? (
                  searchResults.map((item) => (
                    <SearchDisplay
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      img={item.img}
                      price={item.price}
                    />
                  ))
                ) : (
                  <div>Not found</div> // Show "Not found" only if no results and not loading
                )}
              </div>
            )}
          </div>

          <div className="navTabContainer">
            <div className="navIcon navLog">
              <span className="iconfont icon-yonghu" onClick={logIn}></span>
              {isLoggedIn && (
                <div className="logBox" onClick={handleLogout}>
                  Log Out
                </div>
              )}
            </div>
            <div className="navIcon navCart" onClick={handleCart}>
              <span className="iconfont icon-gouwudai_o"></span>
              {totalCount !== 0 && (
                <div className="displayCart">{totalCount}</div>
              )}
            </div>
          </div>
        </div>
        <div className="mid">
          <Outlet />
        </div>
        <div className="footerContainer">
          <div className="logoContainer" onClick={goHome}>
            <div
              className="logo"
              style={{ backgroundImage: `url(${bannerData.logo})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
