import "./NavBar.css";

// react-router
import { NavLink } from "react-router-dom";

// Hooks
import { useAuth } from "../../Hooks/useAuth";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { UseSelector } from "react-redux";

// Redux
import { logout, reset } from "../../Slice/authSlice";

const NavBar = () => {
  const { auth } = useAuth();
  // const { admin } = useSelector((state) => state.auth);

  // const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__left">
          <h1 className="logo">
            Casa <span>Luz</span> Imóveis
          </h1>
        </div>
        <div className="navbar__right">
          <ul className="navbar__options">
            {auth ? (
              <>
                <li className="navbar__option">
                  <NavLink to="/createAds">Novo anúncio</NavLink>
                </li>
                <li className="navbar__option">
                  <NavLink to="/register">Novo admin</NavLink>
                </li>
                <li className="navbar__option">
                  <span onClick={handleLogout}>Sair</span>
                </li>
              </>
            ) : (
              <>
                <li className="navbar__option">Contato</li>
                <li className="navbar__option">Sobre</li>
                <li className="navbar__option">
                  <NavLink to="/login">Sou admin</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
