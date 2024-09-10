import "./Filters.css"; // Importando o arquivo CSS

// Hooks
import React from "react";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

// Components
import { NumericFormat } from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

const Filters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
          <>
            <FontAwesomeIcon icon={faTimes} />
            <span> Fechar Filtros</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span> Filtrar resultados</span>
          </>
        )}
      </button>
      <CSSTransition
        in={formOpen}
        timeout={300}
        classNames="filters-transition"
        unmountOnExit
      >
        <form onSubmit={handleSubmit} className="filters">
          <label>
            <span>Título</span>
            <input
              type="text"
              name="keyword"
              value={localFilters.keyword || ""}
              onChange={handleChange}
              placeholder="Palavra-chave"
              className="filter-input"
            />
          </label>
          <label>
            <span>Tipo de imóvel</span>
            <select
              name="typeOfRealty"
              value={localFilters.typeOfRealty || ""}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">Tipo de imóvel</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="comercial">Comercial</option>
              <option value="terreno">Terreno</option>
            </select>
          </label>
          <label>
            <span>Método de compra</span>
            <select
              name="methodOfSale"
              value={localFilters.methodOfSale || ""}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">Selecione um método</option>
              <option value="Venda">Venda</option>
              <option value="Aluguel">Aluguel</option>
              <option value="">Ambos</option>
            </select>
          </label>
          <label>
            <span>Cidade</span>
            <input
              type="text"
              name="city"
              value={localFilters.city || ""}
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
              value={localFilters.district || ""}
              onChange={handleChange}
              placeholder="Bairro"
              className="filter-input"
            />
          </label>
          <label>
            <span>Quartos</span>
            <input
              type="number"
              name="bedrooms"
              value={localFilters.bedrooms || ""}
              onChange={handleChange}
              placeholder="Quartos"
              className="filter-input"
            />
          </label>
          <label>
            <span>Banheiros</span>
            <input
              type="number"
              name="bathrooms"
              value={localFilters.bathrooms || ""}
              onChange={handleChange}
              placeholder="Banheiros"
              className="filter-input"
            />
          </label>
          <label>
            <span>Vagas de carro</span>
            <input
              type="number"
              name="carVacancies"
              value={localFilters.carVacancies || ""}
              onChange={handleChange}
              placeholder="Vagas de carro"
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
              value={localFilters.minPrice || ""}
              placeholder="Preço Mínimo"
              className="filter-input"
              name="minPrice"
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              fixedDecimalScale
              onChange={handleChange}
              value={localFilters.maxPrice || ""}
              placeholder="Preço Máximo"
              className="filter-input"
              name="maxPrice"
            />
          </label>
          <label className="span-double">
            <span>Tamanho</span>
            <input
              type="number"
              name="minSpace"
              value={localFilters.minSpace || ""}
              onChange={handleChange}
              placeholder="Espaço Mínimo"
              className="filter-input"
            />
            <input
              type="number"
              name="maxSpace"
              value={localFilters.maxSpace || ""}
              onChange={handleChange}
              placeholder="Espaço Máximo"
              className="filter-input"
            />
          </label>

          <button type="submit" className="filter-button">
            Aplicar Filtros
          </button>
        </form>
      </CSSTransition>
    </div>
  );
};

export default Filters;
