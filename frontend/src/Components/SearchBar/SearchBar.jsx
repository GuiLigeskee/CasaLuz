import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchAdsByKeyword,
  searchAdsByMethodOfSale,
} from "../../Slice/adsSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAdsByKeyword(keyword));
    dispatch(searchAdsByMethodOfSale(q));
    navigate(`/search/${keyword}`);
  };

  return (
    <div className="search">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="select-content">
          <select id="propertyType">
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="select-content">
          <select
            id="intentionType"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          >
            <option value="aluguel">Aluguel</option>
            <option value="venda">Venda</option>
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
