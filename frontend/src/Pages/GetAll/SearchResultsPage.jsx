// Na página de resultados (SearchResultsPage.js)

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
      <h1>Resultados da busca por "{keyword}":</h1>
      <div>
        {ads.map((add, index) => (
          <div key={index}>
            <AdsItem add={add} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
