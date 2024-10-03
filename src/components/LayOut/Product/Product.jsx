import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { increment } from "../../../store/modules/counterStore";
import GridBox from "../../GridBox/GridBox";
import { loadProduct } from "../../../store/modules/productStore";
import "./product.css";

export default function Product() {
  const { id } = useParams(); // Get the product id from the URL params
  const dispatch = useDispatch();

  // Access products, loading, and error from the Redux store
  const { products, loading, error } = useSelector((state) => state.productSlice);
  const itemId = parseInt(id, 10); // Convert the id to a number

  // Manage background color and button message state
  const [bgColor, setBgColor] = useState("#33cee5"); // Manage background color for "Add to Bag" button
  const [bagMsg, setBagMsg] = useState("Add to Bag");

  // Fetch the product list if not already loaded
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProduct("http://localhost:3010/products"));
    }
  }, [dispatch, products, loading]);

  // Find the specific product based on the URL id

  // Handle the loading, error, or undefined item cases
  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const item = products.find((product) => product.id == itemId);
  console.log(item)
  if (!item) {
    // Debugging output
    console.log("Products:", products);
    console.log("URL ID:", itemId);
    return <p>Product not found.</p>;
  }

  const { title, category, des, price, pics } = item;  // Destructure item properties
  const img = pics?.default?.front;  // Safely access nested images

  // Handle the button click event
  const handleChange = () => {
    setBagMsg("Adding to Bag");
    setBgColor("lightgray");
    setTimeout(() => {
      setBagMsg("Add to Bag");
      setBgColor("#33cee5");
    }, 500);
  };


  return (
    <div className="toyContainer">
      <div className="displayContainer">
        <div className="picContainer">
          {/* onMouseMove={handleMouseMove}
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: "transform 0.5s ease-out",
              }} */}
          <div className="picOuter">
            <div
              className="pic"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
        </div>

        <div className="info">
          <Link to={`/explore/${category}`}>
            <div className="category">{category}</div>
          </Link>
          <div className="title">{title}</div>
          <div className="text des">{des}</div>

          <div className="divider"></div>
          <br />
          <div className="text">Choose Color</div>

          <br />
          <div className="shopping">
            <div className="price">{price}</div>
            <div
              className="addToContainer"
              style={{ backgroundColor: bgColor }}
            >
              <div
                onClick={() => {
                  dispatch(increment());
                  handleChange();
                }}
              >
                {bagMsg}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bestContainer">
        <GridBox
          gridTitle="Best Sellers"
          gridLink="/bestsellers"
          isShow={true}
          gridBox={products.slice(11, 14)}
        />
      </div>
    </div>
  );
}
