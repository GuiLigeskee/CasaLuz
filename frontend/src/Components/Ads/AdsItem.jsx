import "./AdsItem.css";

import { uploads } from "../../utils/config";

import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { deleteAdd } from "../../Slice/adsSlice";

const AdsItem = ({ add }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPrice, setNewPrice] = useState();

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este anúncio?")) {
      dispatch(deleteAdd(id));
    }
  };

  const renderAdminOptions = () => {
    if (admin) {
      return (
        <div className="admin-options">
          <button
            id="admin-option-update"
            onClick={() => navigate(`/updateAds/${add._id}`)}
          >
            Editar
          </button>
          <button
            id="admin-option-delete"
            onClick={() => handleDelete(add._id)}
          >
            Excluir
          </button>
        </div>
      );
    }
    return null;
  };

  const parseNumberToString = (priceNumber) => {
    if (priceNumber === null || priceNumber === undefined) return "";

    const priceStr = priceNumber.toFixed(2);
    const parts = priceStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${parts.join(",")}`;
  };

  useEffect(() => {
    if (add.price) {
      setNewPrice(parseNumberToString(add.price));
    }
  }, [add]);

  return (
    <div className="ads-item">
      {add && (
        <div>
          {renderAdminOptions()}
          <Link to={`/ads/${add._id}`}>
            <p className="price">
              {add.methodOfSale === "Venda" ? newPrice : `${newPrice}/mês`}
            </p>
            {add.images && add.images.length > 0 && (
              <img src={`${uploads}/ads/${add.images[0]}`} alt={add.title} />
            )}
            <p className="title">
              {add.typeOfRealty}
              {/* <br />
              {`${add.address}, ${add.addressNumber}`} */}
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
