import "./AdsItem.css";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

const AdsItem = ({ add }) => {
  return (
    <Link to={`/ads/${add._id}`}>
      <div className="ads-item">
        {add.images && (
          <div>
            <p className="price">R${add.price}</p>
            <img src={`${uploads}/ads/${add.images[0]}`} alt={add.title} />
            <p className="title">{add.title}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default AdsItem;
