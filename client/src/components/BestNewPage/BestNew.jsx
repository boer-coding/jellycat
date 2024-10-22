import Banner from "./BestNewBanner/BestNewBanner.jsx";
import GridBox from "../Shared/GridBox/GridBox.jsx";
import { useBanner } from "../../App.jsx";

function BestNew(props) {
  const { header, text } = props;
  const { bannerData } = useBanner();
  const bcgImg = header === "NEW IN" ? bannerData.newItem : bannerData.best;
  return (
    <div>
      <Banner text={text} isShow={false} bcgImg={bcgImg} header={header} />
      <div className="boxContainer">
        <GridBox gridTitle={header} />
      </div>
    </div>
  );
}
export default BestNew;
