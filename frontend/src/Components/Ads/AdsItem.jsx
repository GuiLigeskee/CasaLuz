import "./AdsItem.css";

// URL da pasta uploads
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Redux
import { deleteAdd } from "../../Slice/adsSlice";

// Anuncio sem imagem
import anuncioSemImagem from "../../assets/add-sem-imagem.png";

const AdsItem = ({ add }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State do preço
  const [newPrice, setNewPrice] = useState();

  // Função para deletar os ADS
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este anúncio?")) {
      dispatch(deleteAdd(id));
    }
  };

  // Anuncio sem imagem
  const handleImageError = (event) => {
    event.target.src = anuncioSemImagem;
  };

  // Função dos botões do admin
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

  // Formata corretamente o preço do ADS
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
            {add.images ? (
              <img
                src={`${uploads}/ads/${add.images}`}
                alt={add.title}
                onError={handleImageError}
              />
            ) : (
              <img src={anuncioSemImagem} alt="Anúncio sem imagem" />
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
