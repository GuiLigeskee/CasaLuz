import { useState } from "react";

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
      />
      <input
        type="text"
        name="typeOfRealty"
        value={localFilters.typeOfRealty}
        onChange={handleChange}
        placeholder="Tipo de Imóvel"
      />
      <input
        type="text"
        name="methodOfSale"
        value={localFilters.methodOfSale}
        onChange={handleChange}
        placeholder="Método de Venda"
      />
      <input
        type="text"
        name="city"
        value={localFilters.city}
        onChange={handleChange}
        placeholder="Cidade"
      />
      <input
        type="text"
        name="district"
        value={localFilters.district}
        onChange={handleChange}
        placeholder="Bairro"
      />
      <input
        type="number"
        name="minPrice"
        value={localFilters.minPrice}
        onChange={handleChange}
        placeholder="Preço Mínimo"
      />
      <input
        type="number"
        name="maxPrice"
        value={localFilters.maxPrice}
        onChange={handleChange}
        placeholder="Preço Máximo"
      />
      <input
        type="number"
        name="minSpace"
        value={localFilters.minSpace}
        onChange={handleChange}
        placeholder="Espaço Mínimo"
      />
      <input
        type="number"
        name="maxSpace"
        value={localFilters.maxSpace}
        onChange={handleChange}
        placeholder="Espaço Máximo"
      />
      <button type="submit">Aplicar Filtros</button>
    </form>
  );
};

export default Filters;
