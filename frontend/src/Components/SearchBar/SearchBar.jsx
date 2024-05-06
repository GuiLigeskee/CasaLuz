// No componente SearchBar.js

import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import adsService from "../../Service/adsService";
import {
  fetchAdsStart,
  fetchAdsSuccess,
  fetchAdsFailure,
} from "../../Slice/adsSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("Aluguel");
  const [typeOfRealty, setTypeOfRealty] = useState("Casa");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchAdsStart());

    try {
      // Verifica se o keyword está vazio
      if (keyword.trim() !== "") {
        const params = {
          keyword,
          methodOfSale,
          typeOfRealty,
        };
        const data = await adsService.searchAds(params);
        dispatch(fetchAdsSuccess(data));
        navigate(`/search/${keyword}/${methodOfSale}/${typeOfRealty}`);
      } else {
        // Se o keyword estiver vazio, apenas atualize o estado local e não faça a pesquisa
        dispatch(fetchAdsSuccess([])); // Pode ser necessário ajustar como o estado de 'ads' é atualizado
        navigate(`/search/${methodOfSale}/${typeOfRealty}`);
      }
    } catch (error) {
      dispatch(fetchAdsFailure(error));
    }
  };

  return (
    <div className="search">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="select-content">
          <select
            id="propertyType"
            value={typeOfRealty}
            onChange={(e) => setTypeOfRealty(e.target.value)}
          >
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="select-content">
          <select
            id="intentionType"
            value={methodOfSale}
            onChange={(e) => setMethodOfSale(e.target.value)}
          >
            <option value="Aluguel">Aluguel</option>
            <option value="Venda">Venda</option>
          </select>
        </div>

        <input
          type="text"
          id="searchInput"
          placeholder="Pesquisar imóvel..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit">Procurar Imóvel</button>
      </form>
    </div>
  );
};

export default SearchBar;
