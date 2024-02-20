import "./NavBar.css";
import { FiSearch } from "react-icons/fi";

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

  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   if (query) {
  //     return navigate(`/search?q=${query}`);
  //   }
  // };

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
            {auth ? (
              <>
                <li className="navbar__option">
                  <NavLink to="/createAds">Novo anúncio</NavLink>
                </li>
                <li className="navbar__option">Novo admin</li>
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
