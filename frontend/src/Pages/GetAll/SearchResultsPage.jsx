import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchAdsByKeyword } from "../../Slice/adsSlice";
import AdsItem from "../../Components/Ads/AdsItem";
import Message from "../../Components/Messages/Message";

const SearchResultsPage = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { ads, message, error, loading } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(searchAdsByKeyword(keyword));
  }, [dispatch, keyword]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Resultados da busca por --{keyword}--:</h1>
      {Array.isArray(ads) && ads.length > 0 ? (
        ads.map((add) => (
          <div key={add._id}>
            <AdsItem add={add} />
          </div>
        ))
      ) : (
        <Message
          msg="Nenhum anúncio encontrado com a palavra-chave fornecida."
          type="error"
        />
      )}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default SearchResultsPage;
