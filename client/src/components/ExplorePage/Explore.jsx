import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ExploreItem from "./ExploreItem/ExploreItem";
import Banner from "../BestNewPage/BestNewBanner/BestNewBanner";
// import { useBanner } from '../Shared/Context/BannerContext.jsx'; // Adjust the path based on where App is located
import { useBanner } from "../../App.jsx";


import "./explore.css";

export default function Explore() {
  const { bannerData} = useBanner();

  const { category } = useParams();

  const [showMore, setShowMore] = useState(false);
  const { products } = useSelector((state) => state.productSlice);

  const productsByCategory = products.reduce((arr, item) => {
    if (!arr[item.category]) {
      arr[item.category] = [];
    }
    arr[item.category].push(item);
    return arr;
  }, {});

  let itemsToDisplay;
  let boxSize;
  if (category) {
    itemsToDisplay = productsByCategory[category] || [];
    boxSize = itemsToDisplay.length;
  } else {
    itemsToDisplay = products || [];
    boxSize = Math.ceil(itemsToDisplay.length / 3);
  }

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };

  return (
    <div>
      <Banner
        header="Explore All"
        text="Small dog or big unicorn! You never know what you'll find with Jellycat."
        bcgImg={bannerData.explore}
      ></Banner>
      <div className="shopGrid">
        <div className="shopGridContainer">
          {itemsToDisplay
            .slice(0, showMore ? itemsToDisplay.length : boxSize) // Show more items if "showMore" is true
            .map((item) => (
              <ExploreItem
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                img={item.pics.default.front}
                price={item.priceList.small}
              />
            ))}
        </div>
        {!category && !showMore && (
          <div className="showContainer">
            <button className="showMore" onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}

        {!category && showMore && (
          <div className="showContainer">
            <button className="showMore" onClick={handleShowLess}>
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
