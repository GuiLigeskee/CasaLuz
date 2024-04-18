import React from "react";
import "./AdsItem.css";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Importe o hook useSelector

const AdsItem = ({ add }) => {
  // Use o useSelector para acessar o estado global e obter informações sobre o usuário
  const admin = useSelector((state) => state.auth.admin);

  const handleUpdate = (e) => {
    e.preventDefault(); // Evita o redirecionamento da página ao clicar no botão
    // Lógica para atualizar o anúncio
    alert("Atualizando anúncio...");
  };

  const handleDelete = (e) => {
    e.preventDefault(); // Evita o redirecionamento da página ao clicar no botão
    // Lógica para excluir o anúncio
    alert("Excluindo anúncio...");
  };

  const renderAdminOptions = () => {
    if (admin) {
      return (
        <div className="admin-options">
          <button id="admin-option-update" onClick={handleUpdate}>
            Atualizar
          </button>
          <button id="admin-option-delete" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="ads-item">
      {add && (
        <div>
          {renderAdminOptions()}
          <Link to={`/ads/${add._id}`}>
            <p className="price">R${add.price}</p>
            <img src={`${uploads}/ads/${add.images[0]}`} alt={add.title} />
            <p className="title">
              {add.typeOfRealty}
              <br />
              {add.address}
              <br />
              {add.district}, {add.city}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdsItem;
