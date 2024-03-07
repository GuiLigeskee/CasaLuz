import "./SearchBar.css";
// import SearchIcon from "../../assets/procurar.png";

const SearchBar = () => {
  return (
    <div className="search">
      <form className="search-container">
        <input type="text" id="search-bar" placeholder="Pesquisar imóveis" />
        <a href="#">
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          />
        </a>
      </form>
    </div>
  );
};

export default SearchBar;
