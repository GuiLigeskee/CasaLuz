import "./Footer.css";

const Footer = () => {
  return (
    <footer className="rodape" id="contato">
      <div className="rodape-div">
        <div className="rodape-div-1">
          <div className="rodape-div-1-coluna">
            <span>
              <h3>CasaLuz Imóveis</h3>
            </span>
            <p>R. David Geronasso, 685 - Boa Vista, Curitiba - PR, 82540-150</p>
          </div>
        </div>

        <div className="rodape-div-2">
          <div className="rodape-div-2-coluna">
            <span>
              <h3>Contatos</h3>
            </span>
            <p>webcasaluz@gmail.com</p>
            <p>+55 41 8843-0879</p>
          </div>
        </div>

        <div className="rodape-div-3">
          <div className="rodape-div-3-coluna">
            <span>
              <h3>Redes sociais</h3>
            </span>
            <p>
              <a href="https://www.instagram.com/casaluzimoveis/">Instagram</a>
            </p>
          </div>
        </div>

        <div className="rodape-div-4">
          <div className="rodape-div-4-coluna">
            <span>
              <h3>CRECI</h3>
            </span>
            <p>CRECI: 8891-J</p>
          </div>
        </div>
      </div>
      <p className="rodape-direitos">
        Casa Luz CRECI-PR 8891-J – Todos os Direitos Reservados.
      </p>
    </footer>
  );
};

export default Footer;
