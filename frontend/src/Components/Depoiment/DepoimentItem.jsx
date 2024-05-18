import "./DepoimentItem.css";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteDepoiment } from "../../Slice/depoimentSlice";

const DepoimentItem = ({ depoiment }) => {
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

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
  return (
    <Link>
      <div className="depoiment-item">
        {depoiment.images && (
          <div>
            {renderAdminOptions()}
            <img
              src={`${uploads}/depoiment/${depoiment.images[0]}`}
              alt={depoiment.title}
            />
            <p className="title">{depoiment.title}</p>
            <p className="description">"{depoiment.description}"</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DepoimentItem;
