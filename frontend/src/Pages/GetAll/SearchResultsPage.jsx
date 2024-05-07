import "./GetAll.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAdsStart,
  fetchAdsSuccess,
  fetchAdsFailure,
} from "../../Slice/adsSlice";
import adsService from "../../Service/adsService";
import AdsItem from "../../Components/Ads/AdsItem";
import Message from "../../Components/Messages/Message";

const SearchResultsPage = () => {
  const { keyword, methodOfSale, typeOfRealty } = useParams();
  console.log(keyword, methodOfSale, typeOfRealty);
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAdsStart());

      try {
        const params = {
          keyword,
          methodOfSale,
          typeOfRealty,
        };
        const data = await adsService.searchAds(params);
        dispatch(fetchAdsSuccess(data));
      } catch (error) {
        dispatch(fetchAdsFailure(error));
      }
    };

    fetchData();
  }, [dispatch, keyword, methodOfSale, typeOfRealty]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1 className="title">Resultados para sua busca</h1>
      {ads && ads.length > 0 ? (
        <div className="getResults">
          {ads.map((add, index) => (
            <div key={index}>
              <AdsItem add={add} />
            </div>
          ))}
        </div>
      ) : (
        <Message
          msg="Nenhum resultado encontrado para a sua busca."
          type="error"
        />
      )}
    </div>
  );
};

export default SearchResultsPage;
