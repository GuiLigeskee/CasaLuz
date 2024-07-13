import "./GetAll.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdsItem from "../../Components/Ads/AdsItem";
import Filter from "../../Components/Filters/Filters";
import { getAdsFilters, setPage, resetAds } from "../../Slice/adsSlice";

const GetAds = () => {
  const dispatch = useDispatch();
  const { ads, loading, error, page, hasMore } = useSelector(
    (state) => state.ads
  );

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
    bedrooms: "",
    bathrooms: "",
    carVacancies: "",
  });

  useEffect(() => {
    dispatch(getAdsFilters({ filters, page, limit: 5 }));
  }, [dispatch, filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    dispatch(resetAds());
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      hasMore &&
      !loading
    ) {
      dispatch(setPage(page + 1));
    }
  }, [dispatch, page, hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
        <h3>Não foi possível mostrar todos os nossos anúncios :(</h3>
      )}
      {!hasMore && <p>todos anuncios carregados</p>}
    </div>
  );
};

export default GetAds;
