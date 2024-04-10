import "./DepoimentItem.css";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

const DepoimentItem = ({ depoiment }) => {
  return (
    <Link>
      <div className="depoiment-item">
        {depoiment.images && (
          <div>
            <img
              src={`${uploads}/depoiment/${depoiment.images[0]}`}
              alt={depoiment.title}
            />
            <p className="title">{depoiment.description}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DepoimentItem;
