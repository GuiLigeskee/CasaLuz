import "./Home.css";

// Components
import AdsItem from "../../Components/Ads/AdsItem";
import SearchBar from "../../Components/SearchBar/SearchBar";
import DepoimentItem from "../../Components/Depoiment/DepoimentItem";
import Carousel from "../../Components/Carousel/Carousel";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAds } from "../../Slice/adsSlice";
import { getDepoiments } from "../../Slice/depoimentSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { ads } = useSelector((state) => state.ads);

  const { depoiments } = useSelector((state) => state.depoiments);

  // Arrays to store filtered ads
  const [adsForSale, setAdsForSale] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  useEffect(() => {
    dispatch(getAds());
    dispatch(getDepoiments());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(ads)) {
      setAdsForSale(
        ads.filter(
          (add) =>
            add.methodOfSale === "Venda" ||
            add.methodOfSale == "Aluguel e venda"
        )
      );
      setAdsForRent(
        ads.filter(
          (add) =>
            add.methodOfSale === "Aluguel" ||
            add.methodOfSale == "Aluguel e venda"
        )
      );
    }
  }, [ads]);

  return (
    <div>
      <div className="intro-home">
        <div className="intro-content">
          <h1 id="intro-title">Descubra seu lar em Curitiba-PR</h1>
          <h2>Venda e aluguel de imóveis</h2>
          <h3 className="creci">CRECI: 8891-J</h3>
          <SearchBar />
        </div>
      </div>

      {adsForSale.length > 0 && (
        <div className="carroussel-ads">
          <h2 id="carroussel-title">
            Conheça nossos imóveis à <span>venda</span>
          </h2>
          <Carousel itemsPerView={4} autoplay={true} autoplayDelay={5000}>
            {adsForSale.map((add) => (
              <AdsItem key={add._id} add={add} />
            ))}
          </Carousel>
        </div>
      )}

      {adsForRent.length > 0 && (
        <div className="carroussel-ads">
          <h2 id="carroussel-title">
            Conheça nossos imóveis para <span>alugar</span>
          </h2>
          <Carousel itemsPerView={4} autoplay={true} autoplayDelay={5000}>
            {adsForRent.map((add) => (
              <AdsItem key={add._id} add={add} />
            ))}
          </Carousel>
        </div>
      )}

      {depoiments && depoiments.length > 0 && (
        <div className="carousel-depoiments">
          <h2 id="carroussel-title">
            Veja os <span>depoimentos</span> de nossos clientes
          </h2>
          <Carousel itemsPerView={5} autoplay={true} autoplayDelay={5000}>
            {depoiments.map((depoiment) => (
              <DepoimentItem key={depoiment._id} depoiment={depoiment} />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Home;
