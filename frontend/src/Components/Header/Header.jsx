import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo-header">
        <NavLink to="/">
          <img src="/public/logo-casa-luz.png" alt="Casa Luz" />
        </NavLink>
      </h1>
    </div>
  );
};

export default Header;
