import React from "react";
import GridBlock from "./GridBlock/GridBlock";
import "./gridBox.css";
import { Link } from "react-router-dom";

export default function GridBox(props) {
  const { gridTitle, gridLink, isShow, gridBox = [] } = props;
  const box = gridTitle ==="NEW IN" ? gridBox.slice(0, 6) : gridBox.slice(6, 12);


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
        {box.map((item) => (
          <GridBlock
            key={item.id}
            id={item.id}
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
