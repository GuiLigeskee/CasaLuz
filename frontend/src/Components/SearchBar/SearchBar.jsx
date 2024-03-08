import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search">
      <form id="searchForm">
        <div className="select-content">
          <select id="propertyType">
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="sobrado">Sobrado</option>
            <option value="sitio">Sítio</option>
            <option value="terreno">Terreno</option>
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
