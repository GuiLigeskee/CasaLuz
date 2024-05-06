import "./GetAll.css";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import AdsItem from "../../Components/Ads/AdsItem";
// import Message from "../../Components/Messages/Message";

// redux
import { getAds } from "../../Slice/adsSlice";

const GetAds = () => {
  const dispatch = useDispatch();

  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  return (
    <div className="getAds">
      <h1 id="title">
        Veja <span>todos</span> os nossos anúncios!
      </h1>
      {ads ? (
        <div className="ads-content">
          {ads &&
            ads.map((add) => (
              <div key={add._id}>
                <AdsItem add={add} />
              </div>
            ))}
        </div>
      ) : (
        <p>Não foi possível mostrar todos os nossos anúncios :(</p>
      )}
    </div>
  );
};

export default GetAds;
