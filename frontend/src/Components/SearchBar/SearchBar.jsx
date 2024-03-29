import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search">
      <form id="searchForm">
        <div className="select-content">
          <select id="propertyType">
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="select-content">
          <select id="intentionType">
            <option value="aluguel">Aluguel</option>
            <option value="venda">Venda</option>
          </select>
        </div>

        <input type="text" id="searchInput" placeholder="Pesquisar imóvel..." />

        <button type="submit">Procurar Imóvel</button>
      </form>
    </div>
  );
};

export default SearchBar;
