import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo">
        <NavLink to="/">
          Casa <span>Luz</span> Imóveis
        </NavLink>
      </h1>
    </div>
  );
};

export default Header;
