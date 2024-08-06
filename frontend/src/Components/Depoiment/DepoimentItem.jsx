import "./DepoimentItem.css";
import { uploads } from "../../utils/config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteDepoiment } from "../../Slice/depoimentSlice";

import depoimentoSemImagem from "../../assets/depoiment-sem-imagem.png";

const DepoimentItem = ({ depoiment }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  const [isImageValid, setIsImageValid] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este anúncio?")) {
      dispatch(deleteDepoiment(id));
    }
  };

  const renderAdminOptions = () => {
    if (admin) {
      return (
        <div className="admin-options">
          <button
            id="admin-option-delete"
            onClick={() => handleDelete(depoiment._id)}
          >
            Excluir
          </button>
        </div>
      );
    }
    return null;
  };

  // Depoimento sem imagem
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

  return (
    <div className="depoiment-item">
      {depoiment && (
        <div>
          {renderAdminOptions()}
          {depoiment.images &&
            (isImageValid ? (
              <img
                src={`${uploads}/depoiment/${depoiment.images}`}
                alt={depoiment.title}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              <img
                src={depoimentoSemImagem}
                alt="Depoimento sem imagem"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ))}
          <p className="title">{depoiment.title}</p>
          <p className="description">"{depoiment.description}"</p>
        </div>
      )}
    </div>
  );
};

export default DepoimentItem;
