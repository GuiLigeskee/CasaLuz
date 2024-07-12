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
  const [methodOfSale, setMethodOfSale] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("Casa");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchAdsStart());

    try {
      const params = {
        ...(keyword.trim() && { keyword }),
        methodOfSale,
        typeOfRealty,
      };

      const data = await adsService.searchAds(params);
      dispatch(fetchAdsSuccess(data));

      const query = new URLSearchParams(params).toString();
      navigate(`/procurar?${query}`);
    } catch (error) {
      dispatch(fetchAdsFailure(error.message));
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
            <option value="">Ambos</option>
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
