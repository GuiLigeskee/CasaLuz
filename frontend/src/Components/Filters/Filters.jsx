import React from "react";
import { useState } from "react";
import "./Filters.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

// Components
import { NumericFormat } from "react-number-format";

const Filters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

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
    setFormOpen(false);
  };

  return (
    <div className="filters-container">
      <button onClick={toggleForm} className="toggle-button">
        {formOpen ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faTimes} />
            <span> Fechar Filtros</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FontAwesomeIcon icon={faPlus} />
            <span> Abrir Filtros</span>
          </React.Fragment>
        )}
      </button>
      {formOpen && (
        <form onSubmit={handleSubmit} className="filters">
          <label>
            <span>Título</span>
            <input
              type="text"
              name="keyword"
              value={localFilters.keyword}
              onChange={handleChange}
              placeholder="Palavra-chave"
              className="filter-input"
            />
          </label>
          <label>
            <span>Tipo de imóvel</span>
            <input
              type="text"
              name="typeOfRealty"
              value={localFilters.typeOfRealty}
              onChange={handleChange}
              placeholder="Tipo de Imóvel"
              className="filter-input"
            />
          </label>
          <label>
            <span>Método de compra</span>
            <select
              name="methodOfSale"
              value={localFilters.methodOfSale}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">Selecione um método</option>
              <option value="Venda">Venda</option>
              <option value="Aluguel">Aluguel</option>
              <option value="Aluguel e venda">Aluguel e venda</option>
            </select>
          </label>
          <label>
            <span>Cidade</span>
            <input
              type="text"
              name="city"
              value={localFilters.city}
              onChange={handleChange}
              placeholder="Cidade"
              className="filter-input"
            />
          </label>
          <label>
            <span>Bairro</span>
            <input
              type="text"
              name="district"
              value={localFilters.district}
              onChange={handleChange}
              placeholder="Bairro"
              className="filter-input"
            />
          </label>
          <label className="span-double">
            <span>Preço</span>
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              fixedDecimalScale
              onChange={handleChange}
              value={localFilters.minPrice}
              placeholder="Preço Mínimo"
              className="filter-input"
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              fixedDecimalScale
              onChange={handleChange}
              value={localFilters.maxPrice}
              placeholder="Preço Máximo"
              className="filter-input"
            />
          </label>
          <label className="span-double">
            <span>Tamanho</span>
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
          </label>
          <button type="submit" className="filter-button">
            Aplicar Filtros
          </button>
        </form>
      )}
    </div>
  );
};

export default Filters;
