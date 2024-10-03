import Banner from "../../Banner/Banner.jsx";
import GridBox from "../../GridBox/GridBox.jsx";
import { useSelector } from "react-redux";

function Featured(props) {
  const { header, text } = props;
  const { newItem, best } = useSelector((state) => state.banner);
  const bcgImg = header == "NEW IN" ? newItem : best;

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

export default Featured;
