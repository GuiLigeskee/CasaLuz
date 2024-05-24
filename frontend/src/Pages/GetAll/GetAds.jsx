import "./GetAll.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdsItem from "../../Components/Ads/AdsItem";
import Filter from "../../Components/Filters/Filters";
import { getAdsFilters } from "../../Slice/adsSlice";

const GetAds = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  const [filters, setFilters] = useState({
    keyword: "",
    typeOfRealty: "",
    methodOfSale: "",
    city: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    minSpace: "",
    maxSpace: "",
  });

  useEffect(() => {
    const hasFilters = Object.values(filters).some(Boolean);
    if (!hasFilters) {
      dispatch(getAdsFilters({}));
    } else {
      dispatch(getAdsFilters(filters));
    }
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="getAds">
      <h1 id="title">
        Veja <span>todos</span> os nossos anúncios!
      </h1>
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      {loading && <p>Carregando anúncios...</p>}
      {error && <p>{error}</p>}
      {ads && ads.length > 0 ? (
        <div className="ads-content">
          {ads.map((add) => (
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
