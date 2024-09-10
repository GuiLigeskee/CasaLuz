import "./GetAll.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorModal from "../../Components/ErrorModal/ErrorModal"; // Certifique-se de que o caminho está correto
import AdsItem from "../../Components/Ads/AdsItem";
import { getAdsFilters } from "../../Slice/adsSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);
  const query = useQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);

  useEffect(() => {
    const params = {};

    if (query.get("keyword")) {
      params.keyword = query.get("keyword");
    }

    if (query.get("methodOfSale")) {
      params.methodOfSale = query.get("methodOfSale");
    }

    if (query.get("typeOfRealty")) {
      params.typeOfRealty = query.get("typeOfRealty");
    }

    if (Object.keys(params).length > 0) {
      dispatch(getAdsFilters(params));
    }
  }, [dispatch, query.toString()]);

  useEffect(() => {
    if (error) {
      setErrorMessages({ error: error });
      setIsModalOpen(true);
    }
  }, [error]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAnimationClosing(true);
  };

  return (
    <div>
      <h1 id="title">
        Resultados da <span>Pesquisa</span>
      </h1>

      {/* Exibir modal de erro se houver erro */}
      <ErrorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        errors={errorMessages}
        setIsAnimationDone={setIsAnimationDone}
      />

      {/* Se estiver carregando, exibe um loader */}
      {loading && <p>Carregando anúncios...</p>}

      {/* Exibir anúncios se houverem */}
      {ads && ads.length > 0 ? (
        <div className="getResults">
          {ads.map((add) => (
            <div key={add._id}>
              <AdsItem add={add} />
            </div>
          ))}
        </div>
      ) : (
        /* Exibe uma mensagem se não houverem anúncios e não houver erro */
        !loading && !error && <p>Nenhum anúncio encontrado :(</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
