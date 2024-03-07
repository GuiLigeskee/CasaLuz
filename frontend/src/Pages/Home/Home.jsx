import "./Home.css";

// Components
import SearchBar from "../../Components/SearchBar/SearchBar";

// Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <div className="carroussel-ads">
        <h2 id="carroussel-title">
          Conheça nossos imóveis à <span>venda</span>
        </h2>
        <div className="carroussel"></div>
      </div>
    </div>
  );
};

export default Home;
