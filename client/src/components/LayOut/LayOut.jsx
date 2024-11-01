import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useBanner } from "../../App.jsx";
import Cart from "./CartDisplay/Cart.jsx";
import Menu from "./MenuDisplay/Menu.jsx";
import SearchDisplay from "./SearchDisplay/SearchDisplay.jsx";
import { logoutUser } from "../../helpers/userRoutes/logOutUser.js";
import { debouncedSearch } from "../../helpers/productsRoutes/searchProducs.js";
import "./layOut.css";
import "../../font/iconfont.css";

export default function LayOut() {
  const [menuState, setMenutate] = useState(false);

  const [cartState, setCartState] = useState(false);
  const { totalCount } = useSelector((state) => state.counterSlice);
  const { bannerData } = useBanner(); // Access banner data from context
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(true);

  const cartRef = useRef(null); // Ref to detect clicks outside the cart
  const darken = useRef(null);
  const menuRef = useRef(null);
  const displayRef = useRef(null);
  const inputRef = useRef(null);

  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // Check login status

  const navigate = useNavigate();

  useEffect(() => {
    // Handle cart event listener
    if (isInputFocused || searchTerm.length !== 0) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    }

    // Cleanup both event listeners on unmount or when dependencies change
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [isInputFocused, searchTerm]);

  useEffect(() => {
    // Handle cart event listener
    if (cartState) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    }

    // Handle menu event listener
    if (menuState) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }

    // Cleanup both event listeners on unmount or when dependencies change
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [cartState, menuState]);

  const handleMenu = () => {
    if (menuRef.current && darken.current) {
      menuRef.current.style.transform = "translateX(0px)"; // Slide cart into view
      darken.current.style.visibility = "visible";
      darken.current.style.opacity = "1";
    }
    setMenutate(true);
  };

  // Function to close cart (slide it out of view)
  const handleCloseMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(-100%)"; // Slide the cart out of view
      darken.current.style.visibility = "hidden";

      darken.current.style.opacity = "0";
    }
    setMenutate(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value, setSearchResults, setLoading);
  };

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
  const handleClickOutsideCart = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      handleCloseCart(); // Close cart on outside click
    }
  };

  // Detect clicks outside the cart and close the cart
  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleCloseMenu(); // Close cart on outside click
    }
  };

  const handleClickOutsideSearch = (event) => {
    if (displayRef.current && !displayRef.current.contains(event.target)) {
      handleClear(); // Close search display on outside click
    }
  };
  const handleLogout = async () => {
    await logoutUser();
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
  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleClear = () => {
    if (searchTerm !== "") {
      setSearchTerm("");
    }
    setIsInputFocused(false);
  };

  return (
    <div className="layOut">
      <div ref={cartRef} className="cartDisplay">
        <Cart onClose={handleCloseCart} />{" "}
      </div>

      <div ref={menuRef} className="menuDisplay">
        <Menu onClose={handleCloseMenu} />{" "}
      </div>
      <div className="darken" ref={darken}></div>

      {/* <div className="cartContainer"></div> */}
      <div className="mainLayOut">
        <div className="navBar">
          <div className="navTabLeftContainer">
            <div className="navIcon navMenu">
              <span
                className="iconfont icon-caidan"
                onClick={handleMenu}
              ></span>
              <div className="displayMenu"></div>
            </div>

            <div className="navSearchContainer" ref={displayRef}>
              <div className="navSearch">
                <span className="iconfont icon-sousuo"></span>
              </div>
              <div className="navSearchInput">
                <input
                  className="navInputBox"
                  type="text"
                  placeholder="Search Product"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                />
              </div>
              {searchTerm.length !== 0 && (
                <div className="navSearchClear" onClick={handleClear}>
                  <span className="iconfont icon-chacha"></span>
                </div>
              )}

              {searchTerm.length !== 0 && (
                <div className="navSearchDisplay">
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
                        onClearSearch={() => {
                          setSearchTerm(""); // Clear search term
                          setIsInputFocused(false); // Remove focus from input
                        }}
                      />
                    ))
                  ) : (
                    <div ref={displayRef}>Not found</div> // Show "Not found" only if no results and not loading
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className="logoContainer"
            onClick={() => {
              navigate("/");
            }}
          >
            <div
              className="logo"
              style={{ backgroundImage: `url(${bannerData.logo})` }}
            ></div>
          </div>

          <div className="navTabRightContainer">
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
          <div
            className="logoContainer"
            onClick={() => {
              navigate("/");
            }}
          >
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
