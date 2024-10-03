import "./home.css";
import GridBox from "../../GridBox/GridBox.jsx";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import banner1 from "../../../img/banner1.webp";
import banner2 from "../../../img/banner2.jpg";
import banner3 from "../../../img/banner3.jpg";
import banner4 from "../../../img/banner4.jpeg";

function Home() {
  // const { home } = useSelector((state) => state.banner);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.productSlice);
  const imgList = useRef(null);
  const circleList = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appendFirst, setAppendFirst] = useState(false);
  const totalImages = 4; // Assuming you have 4 images
  const transitionDuration = 500; // Duration of the slide transition

  useEffect(() => {
    if (imgList.current && !appendFirst) {
      const firstChild = imgList.current.firstChild;

      if (firstChild) {
        const clonedChildFirst = firstChild.cloneNode(true);
        imgList.current.appendChild(clonedChildFirst);
        imgList.current.style.width = `calc(100% * 5)`;
        setAppendFirst(true); // Mark that the child has been appended
      }
    }
  }, [appendFirst]);
  // Move right function
  const picLeft = () => {
    if (imgList.current) {
      imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
      // Move to the right if not at the last image
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        imgList.current.style.left = `-${currentIndex - 1}00%`;
      }

      // Handle resetting the carousel when reaching the cloned last image
      if (currentIndex === 0) {
        imgList.current.style.left = `-${totalImages}00%`;
        imgList.current.style.transition = "none";

        setTimeout(() => {
          // Disable the transition to avoid visible jumping
          setCurrentIndex(totalImages - 1);
          imgList.current.style.left = `-${totalImages - 1}00%`;
          imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
        }, 500);
      }
    }
  };
  // Move right function
  const picRight = () => {
    if (imgList.current) {
      imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
      // Move to the right if not at the last image
      if (currentIndex < totalImages) {
        setCurrentIndex(currentIndex + 1);
        imgList.current.style.left = `-${currentIndex + 1}00%`;
      }

      // Handle resetting the carousel when reaching the cloned last image
      if (currentIndex === totalImages - 1) {
        setTimeout(() => {
          // Disable the transition to avoid visible jumping
          setCurrentIndex(0);
          imgList.current.style.left = "0"; // Reset back to the original first image
          imgList.current.style.transition = "none";
        }, transitionDuration);
      }
    }
  };

  // highlight dot when selected
  useEffect(() => {
    if (circleList.current) {
      const circles = circleList.current.children;
      for (let i = 0; i < circles.length; i++) {
        const spanElement = circles[i].querySelector("span");
        if (spanElement) {
          spanElement.classList.remove("activeCircle"); // Remove the class from all spans
        }
      }
      if (circles[currentIndex]) {
        const activeSpan = circles[currentIndex].querySelector("span");
        if (activeSpan) {
          activeSpan.classList.add("activeCircle"); // Add class to current circle
        }
      }
    }
  }, [currentIndex]);

  const goToImage = (index) => {
    setCurrentIndex(index);
    if (imgList.current) {
      imgList.current.style.transition = `left ${transitionDuration}ms ease-in-out`;
      imgList.current.style.left = `-${index}00%`; // Move to the selected image
    }
  };

  return (
    <div className="home">
            {/* {home ? (
             <div className="wrap">
             <div className="imgList" ref={imgList}>
               <div className="img" style={{ backgroundImage: `url(${home.home1})` }}>
                 <div className="bannerContainer">
                   <div className="bannerTitle">
                     Born in London. Loved worldwide.
                   </div>
                   <div
                     onClick={() => {navigate("/explore");}}className="bannerLink">
                     explore all
                   </div>
                 </div>
               </div>
               <div className="img" style={{ backgroundImage: `url(${home.home2})` }}>
                 <div className="bannerContainer">
                   <div className="bannerTitle">Expect the unexpected.</div>
                   <div
                     onClick={() => {navigate("/newin");}}className="bannerLink">
                     NEW IN
                   </div>
                 </div>
               </div>
               <div className="img" style={{ backgroundImage: `url(${home.home3})` }}>
                 <div className="bannerContainer">
                   <div className="bannerTitle">Discover Our Most Loved.</div>
                   <div
                     onClick={() => {navigate("/bestsellers");}}className="bannerLink">
                     BEST SELLERs
                   </div>
                 </div>
               </div>
               <div className="img" style={{ backgroundImage: `url(${home.home4})` }}>
                 <div className="bannerContainer">
                   <div className="bannerTitle">FOR THE JOY OF IT.</div>
                   <div
                     onClick={() => {navigate("/explore");}}className="bannerLink">
                     explore all
                   </div>
                 </div>
               </div>
         
             </div>
             <div className="arrow">
               <div>
                 <span className="iconfont icon-arrow-left" onClick={picLeft}></span>
               </div>
               <div>
                 <span
                   className="iconfont icon-arrowright"
                   onClick={picRight}
                 ></span>
               </div>
             </div>
             <ul className="circleList" ref={circleList}>
               <li className="circle" onClick={() => goToImage(0)}>
                 <span className="iconfont icon-circle"></span>
               </li>
               <li className="circle" onClick={() => goToImage(1)}>
                 <span className="iconfont icon-circle"></span>
               </li>
               <li className="circle" onClick={() => goToImage(2)}>
                 <span className="iconfont icon-circle"></span>
               </li>
               <li className="circle" onClick={() => goToImage(3)}>
                 <span className="iconfont icon-circle"></span>
               </li>
             </ul>
           </div>
          ) : (
            <p>Loading...</p>
          )} */}
      <div className="wrap">
        <div className="imgList" ref={imgList}>
          <div className="img" style={{ backgroundImage: `url(${banner1})` }}>
            <div className="bannerContainer">
              <div className="bannerTitle">
                Born in London. Loved worldwide.
              </div>
              <div
                onClick={() => {navigate("/explore");}}className="bannerLink">
                explore all
              </div>
            </div>
          </div>
          <div className="img" style={{ backgroundImage: `url(${banner2})` }}>
            <div className="bannerContainer">
              <div className="bannerTitle">Expect the unexpected.</div>
              <div
                onClick={() => {navigate("/newin");}}className="bannerLink">
                NEW IN
              </div>
            </div>
          </div>
          <div className="img" style={{ backgroundImage: `url(${banner3})` }}>
            <div className="bannerContainer">
              <div className="bannerTitle">Discover Our Most Loved.</div>
              <div
                onClick={() => {navigate("/bestsellers");}}className="bannerLink">
                BEST SELLERs
              </div>
            </div>
          </div>
          <div className="img" style={{ backgroundImage: `url(${banner4})` }}>
            <div className="bannerContainer">
              <div className="bannerTitle">FOR THE JOY OF IT.</div>
              <div
                onClick={() => {navigate("/explore");}}className="bannerLink">
                explore all
              </div>
            </div>
          </div>
    
        </div>
        <div className="arrow">
          <div>
            <span className="iconfont icon-arrow-left" onClick={picLeft}></span>
          </div>
          <div>
            <span
              className="iconfont icon-arrowright"
              onClick={picRight}
            ></span>
          </div>
        </div>
        <ul className="circleList" ref={circleList}>
          <li className="circle" onClick={() => goToImage(0)}>
            <span className="iconfont icon-circle"></span>
          </li>
          <li className="circle" onClick={() => goToImage(1)}>
            <span className="iconfont icon-circle"></span>
          </li>
          <li className="circle" onClick={() => goToImage(2)}>
            <span className="iconfont icon-circle"></span>
          </li>
          <li className="circle" onClick={() => goToImage(3)}>
            <span className="iconfont icon-circle"></span>
          </li>
        </ul>
      </div>
      <div className="homeProducts">
        <GridBox
          gridTitle="NEW IN"
          gridLink="/newin"
          isShow={true}
          gridBox={products}
        />
      </div>
      <div className="homeProducts">
        <GridBox
          gridTitle="BEST SELLERS"
          gridLink="/bestsellers"
          isShow={true}
          gridBox={products}
        />
      </div>
    </div>
  );
}

export default Home;
