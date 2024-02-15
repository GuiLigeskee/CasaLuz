import "./NavBar.css";
import { FiSearch } from "react-icons/fi";

// react-router
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__left">
          <h1 className="logo">Casa Luz</h1>
        </div>
        <div className="navbar__center">
          <div className="navbar__search">
            <FiSearch className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="navbar__search-input"
            />
          </div>
        </div>
        <div className="navbar__right">
          <ul className="navbar__options">
            <li className="navbar__option">Contato</li>
            <li className="navbar__option">Sobre</li>
            <li className="navbar__option">
              <NavLink to="/login">Sou admin</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
