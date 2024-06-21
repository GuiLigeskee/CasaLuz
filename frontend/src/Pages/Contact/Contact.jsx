import "./Contact.css";
import Whatsapp from "../../assets/whatsapp.svg";
import Tell from "../../assets/phone.svg";
import Logo from "../../assets/logo-casa-luz.png";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="logo">
        <img src={Logo} alt="Casa Luz" className="logo" />
      </div>
      <h3 id="title">
        Tem <span>interesse</span> em alugar ou vender seu imóvel?
      </h3>
      <h4 id="subtitle">Entre em contato conosco!</h4>
      <div className="contact-buttons">
        <a
          id="contact-button"
          href={`https://wa.me/+5541988430879`}
          target="blank"
        >
          <img src={Whatsapp} alt="Whatsapp" />
          <p>Whatsapp</p>
        </a>
        <a id="contact-button" href={`tell:+5541988430879`} target="_blank">
          <img src={Tell} alt="Telefone" />
          <p>Telefone</p>
        </a>
      </div>
    </div>
  );
};

export default Contact;
