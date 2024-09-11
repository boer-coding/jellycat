import React from "react";
import GlassBlock from "./GlassBlock/GlassBlock"
import "./mainGridBox.css";

export default function MainGridBox() {
  const mainBox = [
    {
      url: '../../image/featured/1',
      title: "Burnikk",
      text: "Sexbomb",
    },
    {
      url: "../../image/featured/1",
      title: "Kibal Batal",
      text: "Kibal Black",
    },
    {
      url: "../../image/featured/1",
      title: "Very Nice",
      text: "Salt maalat",
    },
    {
      url: "../../image/featured/1",
      title: "Buldit",
      text: "Salt maalat",
    },
    {
      url: "../../image/featured/1",
      title: "Balakubak",
      text: "Betsin Maalat",
    },
    {
      url: "../../image/featured/1",
      title: "Tiktilaok Manok",
      text: "Sexbomb",
    },
  ];
  return (
    <div className="mainGrid">
      <div className="mainGridHeader">
        <div className=""></div>
        <div></div>
      </div>
      <div className="mainGridContainer">
        {mainBox.map((item, index) => (
          <GlassBlock
            key={index}
            url={item.url}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}
