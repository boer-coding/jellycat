import Banner from "./BestNewBanner/BestNewBanner.jsx";
import GridBox from "../Shared/GridBox/GridBox.jsx";
import { useSelector } from "react-redux";
// import { useBanner } from '../Shared/Context/BannerContext.jsx'; // Adjust the path based on where App is located
import { useBanner } from "../../App.jsx";

function BestNew(props) {
  
  const { header, text } = props;
  const { bannerData } = useBanner();
  const bcgImg = header === "NEW IN" ? bannerData.newItem : bannerData.best;

  const {products} = useSelector((state) => state.productSlice);

  return (
    <div>
      <Banner text={text} isShow={false} bcgImg={bcgImg} header={header} />
      <div className="boxContainer">
        <GridBox gridBox={products} gridTitle = {header} />
      </div>
    </div>
  );
}

export default BestNew;
