import "./About.css";
import Logo from "../../assets/logo-casa-luz.png";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="logo">
          <img src={Logo} alt="Casa Luz" className="logo" />
        </div>
        <div className="about-text">
          <p>
            A Imobiliária Casa Luz é uma empresa nova, mas com grandes ambições
            e um forte compromisso com a excelência. Estamos aqui para
            transformar a forma como você compra e aluga imóveis, oferecendo um
            serviço de qualidade, transparente e personalizado. Venha conhecer a
            Casa Luz e descubra como podemos ajudar você a encontrar o imóvel
            dos seus sonhos ou a melhor opção de locação.
          </p>
          <p>
            Na Casa Luz, seu futuro imobiliário começa com a confiança e o
            brilho de um novo começo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
