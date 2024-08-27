import "./DepoimentItem.css";

// URL da pasta uploads
import { uploads } from "../../utils/config";

// Hooks
import { useDispatch, useSelector } from "react-redux";

// Redux
import { deleteDepoiment } from "../../Slice/depoimentSlice";

// PNG
import depoimentoSemImagem from "../../assets/depoiment-sem-imagem.png";

const DepoimentItem = ({ depoiment }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  // Função para deletar os depoimentos
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esse depoimento?")) {
      dispatch(deleteDepoiment(id));
    }
  };

  // Função dos botões do admin
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
  const handleImageError = (event) => {
    event.target.src = depoimentoSemImagem;
  };

  return (
    <div className="depoiment-item">
      {depoiment && (
        <div>
          {renderAdminOptions()}
          {depoiment.images ? (
            <img
              src={`${uploads}/depoiment/${depoiment.images}`}
              alt={depoiment.title}
              onError={handleImageError}
            />
          ) : (
            <img src={depoimentoSemImagem} alt="Depoimento sem imagem" />
          )}
          <p className="title">{depoiment.title}</p>
          <p className="description">"{depoiment.description}"</p>
        </div>
      )}
    </div>
  );
};

export default DepoimentItem;
