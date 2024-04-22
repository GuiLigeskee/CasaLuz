import React from "react";
import "./AdsItem.css";
import { uploads } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdsItem = ({ add }) => {
  const admin = useSelector((state) => state.auth.admin);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/updateAds/${add._id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
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
