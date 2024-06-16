import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-casa-luz.png";

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo-header">
        <NavLink to="/">
          <img src={Logo} alt="" />
        </NavLink>
      </h1>
    </div>
  );
};

export default Header;
