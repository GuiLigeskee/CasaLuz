import { NavLink } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../Slice/authSlice";
import { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar__content">
          <ul className="sidebar__options">
            {auth ? (
              <>
                <li>
                  <NavLink to="/Ads">Ver anúncios</NavLink>
                </li>
                <li>
                  <NavLink to="/createAds">Novo anúncio</NavLink>
                </li>
                <li>
                  <NavLink to="/depoiments">Ver depoimentos</NavLink>
                </li>
                <li>
                  <NavLink to="/createDepoiment">Novo depoimento</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Novo admin</NavLink>
                </li>
                <li>
                  <span id="exit" onClick={handleLogout}>
                    Sair
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/Ads">Ver anúncios</NavLink>
                </li>
                <li>
                  <NavLink to="/depoiments">Ver depoimentos</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Entre em contato</NavLink>
                </li>
                <li>
                  <NavLink to="/about-us">Sobre nós</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Sou admin</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
      <div className="navbar">
        <div className="navbar__left">
          <button className="menu__toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
