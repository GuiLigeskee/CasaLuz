import "./Home.css";

// Components
import SearchBar from "../../Components/SearchBar/SearchBar";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAds } from "../../Slice/adsSlice";
import AdsItem from "../../Components/Ads/AdsItem";

const Home = () => {
  const dispatch = useDispatch();

  const { ads, loading } = useSelector((state) => state.ads);

  // Load all ads
  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <div className="carroussel-ads">
        <h2 id="carroussel-title">
          Conheça nossos imóveis à <span>venda</span>
        </h2>
        <div className="carroussel">
          {ads &&
            ads.map((add) => (
              <div key={add._id}>
                <AdsItem add={add} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
