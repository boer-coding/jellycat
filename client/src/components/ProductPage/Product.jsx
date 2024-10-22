import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { increment } from "../../store/modules/counterStore";
import "./product.css";
import axios from "axios";

export default function Product() {
  const { id } = useParams(); // Get the product id from the URL params
  const imgList = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appendFirst, setAppendFirst] = useState(false);
  const [size, setSize] = useState("default"); // Set initial size to 'small'
  // Manage background color and button message state
  const [bgColor, setBgColor] = useState("#33cee5"); // Manage background color for "Add to Bag" button
  const [bagMsg, setBagMsg] = useState("Add to Bag");

  const totalImages = 3; // Assuming you have 4 images
  const transitionDuration = 500; // Duration of the slide transition
  const dispatch = useDispatch();

  useEffect(() => {
    if (imgList.current && !appendFirst) {
      const firstChild = imgList.current.firstChild;

      if (firstChild) {
        const clonedChildFirst = firstChild.cloneNode(true);
        imgList.current.appendChild(clonedChildFirst);
        imgList.current.style.width = `calc(100% * 4)`;
        setAppendFirst(true); // Mark that the child has been appended
      }
    }
  }, [appendFirst]);

  // Carousel functions
  const picLeft = () => {
    if (imgList.current) {
      imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
      setCurrentIndex(currentIndex - 1);

      if (currentIndex === 0) {
        imgList.current.style.left = `-${totalImages}00%`;
        imgList.current.style.transition = "none";

        setTimeout(() => {
          setCurrentIndex(totalImages - 1);
          imgList.current.style.left = `-${totalImages - 1}00%`;
          imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
        }, 0);
      } else {
        imgList.current.style.left = `-${currentIndex - 1}00%`;
      }
    }
  };

  const picRight = () => {
    if (imgList.current) {
      setCurrentIndex(currentIndex + 1);
      imgList.current.style.left = `-${currentIndex + 1}00%`;
      imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;

      if (currentIndex === totalImages - 1) {
        setTimeout(() => {
          setCurrentIndex(0);
          imgList.current.style.left = "0";
          imgList.current.style.transition = "none";
        }, transitionDuration);
      }
    }
  };
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jellycat-backend-14f22f6178c9.herokuapp.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id])


  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  // Handle product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Destructure product properties
  const { title, category, des, priceList, pics } = product;

  // Function to handle dropdown change
  const handleSizeChange = (event) => {
    const selectedValue = event.target.value; // Get the selected size from dropdown
    setSize(selectedValue); // Update the selected size
  };

  const img = pics?.default?.front; // Safely access nested images

  const handleAddCart = () => {
    if (size !== "default") {
      dispatch(increment({ id, img, title, price:priceList[size], size }));
      handleChange(); // Any additional logic after adding to the cart
    }
  };
  // Handle the button click event
  const handleChange = () => {
    setBagMsg("Adding to Bag");
    setBgColor("lightgray");
    setTimeout(() => {
      setBagMsg("Add to Bag");
      setBgColor("#33cee5");
    }, 300);
  };

  return (
    <div className="toyContainer">
      <div className="displayContainer">
        <div className="picContainer">
          <div className="picOuter" ref={imgList}>
            <div className="picHolder">
              <div
                className="pic"
                style={{ backgroundImage: `url(${pics?.default?.front})` }}
              ></div>
            </div>

            <div className="picHolder">
              <div
                className="pic"
                style={{ backgroundImage: `url(${pics?.default?.side})` }}
              ></div>
            </div>
            <div className="picHolder">
              <div
                className="pic"
                style={{ backgroundImage: `url(${pics?.default?.back})` }}
              ></div>
            </div>
          </div>
          <div className="arrow">
            <div>
              <span
                className="iconfont icon-lunbozuofangun"
                onClick={picLeft}
              ></span>
            </div>
            <div>
              <span
                className="iconfont icon-lunboyoufangun"
                onClick={picRight}
              ></span>
            </div>
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
          <div id="styleChoser">
            <label htmlFor="dropdown" id="dropDownText">
              Choose a Style
            </label>
            <select name="size" id="dropdown" onChange={handleSizeChange}>
              <option value="default" disabled={size !== "default"}>
                Choose Options
              </option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <br />
          <div className="shopping">
            <div className="price">{size === "default"? priceList["small"]:priceList[size]}</div>
            <div
              className="addToContainer"
              style={{ backgroundColor: bgColor }}
            >
              <div onClick={handleAddCart}>{bagMsg}</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bestContainer">
        <GridBox
          gridTitle="Best Sellers"
          gridLink="/bestsellers"
          isShow={true}
          gridBox={product}
        />
      </div> */}
    </div>
  );
}
