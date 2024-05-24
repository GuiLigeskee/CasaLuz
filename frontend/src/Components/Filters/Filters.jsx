import { useState } from "react";
import "./Filters.css"; // Importando o arquivo CSS

const Filters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      <input
        type="text"
        name="keyword"
        value={localFilters.keyword}
        onChange={handleChange}
        placeholder="Palavra-chave"
        className="filter-input"
      />
      <input
        type="text"
        name="typeOfRealty"
        value={localFilters.typeOfRealty}
        onChange={handleChange}
        placeholder="Tipo de Imóvel"
        className="filter-input"
      />
      <input
        type="text"
        name="methodOfSale"
        value={localFilters.methodOfSale}
        onChange={handleChange}
        placeholder="Método de Venda"
        className="filter-input"
      />
      <input
        type="text"
        name="city"
        value={localFilters.city}
        onChange={handleChange}
        placeholder="Cidade"
        className="filter-input"
      />
      <input
        type="text"
        name="district"
        value={localFilters.district}
        onChange={handleChange}
        placeholder="Bairro"
        className="filter-input"
      />
      <input
        type="number"
        name="minPrice"
        value={localFilters.minPrice}
        onChange={handleChange}
        placeholder="Preço Mínimo"
        className="filter-input"
      />
      <input
        type="number"
        name="maxPrice"
        value={localFilters.maxPrice}
        onChange={handleChange}
        placeholder="Preço Máximo"
        className="filter-input"
      />
      <input
        type="number"
        name="minSpace"
        value={localFilters.minSpace}
        onChange={handleChange}
        placeholder="Espaço Mínimo"
        className="filter-input"
      />
      <input
        type="number"
        name="maxSpace"
        value={localFilters.maxSpace}
        onChange={handleChange}
        placeholder="Espaço Máximo"
        className="filter-input"
      />
      <button type="submit" className="filter-button">
        Aplicar Filtros
      </button>
    </form>
  );
};

export default Filters;
