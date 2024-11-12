import "./GetAll.css";

// Hooks
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import AdsItem from "../../Components/Ads/AdsItem";
import Filter from "../../Components/Filters/Filters";
import Loading from "../../Components/Loading/Loading";

// Redux
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
    console.log("Enviando filtros:", filters); // Debug para verificar o conteúdo de `filters`
    dispatch(getAdsFilters(filters));
  }, [dispatch, filters]);
  

  const handleFilterChange = (newFilters) => {
    const cleanedFilters = { ...newFilters };
  
    if (cleanedFilters.minPrice) {
      cleanedFilters.minPrice = parseFloat(
        cleanedFilters.minPrice.replace(/[^\d,]/g, "").replace(",", ".")
      );
    }
  
    if (cleanedFilters.maxPrice) {
      cleanedFilters.maxPrice = parseFloat(
        cleanedFilters.maxPrice.replace(/[^\d,]/g, "").replace(",", ".")
      );
    }
  
    setFilters(cleanedFilters);
    dispatch(resetAds());
  };
  

  // const handleScroll = useCallback(() => {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //     hasMore &&
  //     !loading
  //   ) {
  //     dispatch(setPage(page + 1));
  //   }
  // }, [dispatch, page, hasMore, loading]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  return (
    <div className="getAds">
      <h1 id="title">
        Veja <span>todos</span> os nossos anúncios!
      </h1>
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      {loading && <Loading />}
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
      {/* {!hasMore && <p>todos anuncios carregados</p>} */}
    </div>
  );
};

export default GetAds;
