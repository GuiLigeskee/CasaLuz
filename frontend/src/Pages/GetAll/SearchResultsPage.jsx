import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAdsFilters } from "../../Slice/adsSlice";
import AdsItem from "../../Components/Ads/AdsItem";
import "./GetAll.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);
  const query = useQuery();

  useEffect(() => {
    const params = {
      keyword: query.get("keyword") || "",
      methodOfSale: query.get("methodOfSale") || "Aluguel",
      typeOfRealty: query.get("typeOfRealty") || "Casa",
    };

    dispatch(getAdsFilters(params));
  }, [dispatch, query.toString()]);

  return (
    <div className="">
      <h1 className="title">Resultados da Pesquisa</h1>
      {loading && <p>Carregando anúncios...</p>}
      {error && <p>{error}</p>}
      {ads && ads.length > 0 ? (
        <div className="getResults">
          {ads.map((add) => (
            <div key={add._id}>
              <AdsItem add={add} />
            </div>
          ))}
        </div>
      ) : (
        <p>Não foi possível encontrar anúncios correspondentes :(</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
