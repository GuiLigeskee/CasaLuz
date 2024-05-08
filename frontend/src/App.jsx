import "./App.css";
import { Outlet } from "react-router-dom";

// Components
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
