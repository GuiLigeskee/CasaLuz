import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo-header">
        <NavLink to="/">
          <img src="../../../public/LOGO CASA LUZ AZUL.png" alt="Casa Luz" />
        </NavLink>
      </h1>
    </div>
  );
};

export default Header;
