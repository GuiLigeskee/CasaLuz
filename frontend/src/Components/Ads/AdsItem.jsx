import "./AdsItem.css";
import { uploads } from "../../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAdd } from "../../Slice/adsSlice";

const AdsItem = ({ add }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este anúncio?")) {
      dispatch(deleteAdd(id)); // Despacha a ação deleteAdd com o ID do anúncio
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

  return (
    <div className="ads-item">
      {add && (
        <div>
          {renderAdminOptions()}
          <Link to={`/ads/${add._id}`}>
            <p className="price">
              {add.methodOfSale === "Venda"
                ? `R$${add.price}`
                : `R$${add.price}/mês`}
            </p>
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
