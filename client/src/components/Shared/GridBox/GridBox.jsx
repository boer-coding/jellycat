import React from "react";
import GridBlock from "./GridBlock/GridBlock";
import "./gridBox.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGroupProducts } from "../../../helpers/productsRoutes/fetchGroup";

export default function GridBox(props) {
  const { gridTitle, gridLink, isShow} = props;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchGroupProducts(gridTitle, setLoading, setProducts, setError);
  }, [gridTitle]);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }


  return (
    <div className="grid">
      {isShow && (
        <div className="gridHeader">
          <div className="gridTitle">{gridTitle}</div>
          <div className="seeAll">
            <Link
              to={gridLink}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              See All
            </Link>
          </div>
        </div>
      )}

      <div className="gridContent">
        {!loading && products.map((item) => (
          <GridBlock
            key={item._id}
            id={item._id}
            img={item.pics.default.front}
            title={item.title}
            category={item.category}
            price={item.priceList.small}
            pics={item.pics}
          />
        ))}
      </div>
    </div>
  );
}
