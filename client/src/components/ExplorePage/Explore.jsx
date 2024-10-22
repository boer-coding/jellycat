import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExploreItem from "./ExploreItem/ExploreItem";
import Banner from "../BestNewPage/BestNewBanner/BestNewBanner";
import { useBanner } from "../../App.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

import "./explore.css";

export default function Explore() {
  const { bannerData } = useBanner();
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 6; // Define your page size

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = category
          ? `https://jellycat-backend-14f22f6178c9.herokuapp.com/products?category=${category}&page=${currentPage}&pageSize=${pageSize}`
          : `https://jellycat-backend-14f22f6178c9.herokuapp.com/products?page=${currentPage}&pageSize=${pageSize}`;

        const response = await axios.get(apiUrl);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, category]);

  return (
    <div>
      <Banner
        header="Explore All"
        text="Small dog or big unicorn! You never know what you'll find with Jellycat."
        bcgImg={bannerData.explore}
      />
      <div className="shopGrid">
        <div className="shopGridContainer">
          {products.map((item) => (
            <ExploreItem
              key={item._id}
              id={item._id}
              title={item.title}
              category={item.category}
              img={item.pics.default.front}
              price={item.priceList.small}
            />
          ))}
        </div>
      </div>

      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Stack>
    </div>
  );
}

