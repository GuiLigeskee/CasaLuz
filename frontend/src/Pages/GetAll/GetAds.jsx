import "./GetAll.css";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import AdsItem from "../../Components/Ads/AdsItem";
import Filter from "../../Components/Filters/Filters";

// Redux
import { getAdsFilters } from "../../Slice/adsSlice";

const GetAds = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  // States for filters
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
    // Verifica se já existem filtros aplicados
    const hasFilters = Object.values(filters).some(Boolean);
    // Se não houver filtros aplicados, busca todos os anúncios
    if (!hasFilters) {
      dispatch(getAdsFilters({})); // Passa um objeto vazio para buscar todos os anúncios
    } else {
      // Se houver filtros, busca os anúncios com base nos filtros atuais
      dispatch(getAdsFilters(filters));
    }

    console.log(ads);
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
      {error === "failed" && <p>{error}</p>}
      {ads && (ads.length > 0 || Object.keys(filters).length === 0) ? (
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
