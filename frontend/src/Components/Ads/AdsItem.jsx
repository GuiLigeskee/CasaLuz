import "./AdsItem.css";

import { uploads } from "../../utils/config";

import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { deleteAdd } from "../../Slice/adsSlice";

import anuncioSemImagem from "../../assets/add-sem-imagem.png";

const AdsItem = ({ add }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPrice, setNewPrice] = useState();

  const [isImageValid, setIsImageValid] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este anúncio?")) {
      dispatch(deleteAdd(id));
    }
  };

  // Anuncio sem imagem
  const handleImageError = () => {
    if (imageLoaded) return;
    setIsImageValid(false);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    if (imageLoaded) return;
    setIsImageValid(true);
    setImageLoaded(true);
  };

  const renderAdminOptions = () => {
    if (admin) {
      return (
        <div className="admin-options">
          <button
            id="admin-option-update"
            onClick={() => navigate(`/atualizar-anuncio/${add._id}`)}
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
          <Link to={`/anuncio/${add.referenceAds}`}>
            <p className="price">
              {add.methodOfSale === "Venda" ? newPrice : `${newPrice}/mês`}
            </p>
            {add.images &&
              (isImageValid ? (
                <img
                  src={`${uploads}/ads/${add.images}`}
                  alt={add.title}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              ) : (
                <img
                  src={anuncioSemImagem}
                  alt="Anúncio sem imagem"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              ))}
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
