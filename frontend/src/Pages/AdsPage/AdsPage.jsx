import "./AdsPage.css";

// URL da pasta uploads
import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getAdsDetailsByReference } from "../../Slice/adsSlice";

// SVGs
import anuncioSemImagem from "../../assets/add-sem-imagem.png";
import Whatsapp from "../../assets/whatsapp.svg";
import Tell from "../../assets/phone.svg";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faMapMarkerAlt,
  faCar,
  faRuler,
  faHome,
  faMoneyBillWave,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const AdsPage = () => {
  const { add } = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const { referenceAds } = useParams();

  // State do preço
  const [newPrice, setNewPrice] = useState();

  // State do anuncio sem imagem
  const [validImages, setValidImages] = useState([]);

  // State da galeria
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Limpa a string do telefone e whatsapp
  const cleanedNumberWhatsapp =
    add.whatsapp && add.whatsapp.replace(/[()\s-]/g, "");
  const cleanedNumberTell = add.tell && add.tell.replace(/[()\s-]/g, "");

  useEffect(() => {
    dispatch(getAdsDetailsByReference(referenceAds));
  }, [dispatch, referenceAds]);

  // Formata corretamente o preço do ADS
  const parseNumberToString = (priceNumber) => {
    if (priceNumber === null || priceNumber === undefined) return "";

    const priceStr = priceNumber.toFixed(2);
    const parts = priceStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${parts.join(",")}`;
  };

  useEffect(() => {
    if (add.price) {
      setNewPrice(parseNumberToString(add.price));
    }
  }, [add.price]);

  // Anuncio sem imagem
  const handleImageError = (index) => {
    setValidImages((prev) => {
      const newValidImages = [...prev];
      newValidImages[index] = false;
      return newValidImages;
    });
  };
  const handleImageLoad = (index) => {
    setValidImages((prev) => {
      const newValidImages = [...prev];
      newValidImages[index] = true;
      return newValidImages;
    });
  };

  // Formata a descrição preservando quebras de linha e parágrafos
  const formatDescription = (text) => {
    if (!text) return null;

    // Divide o texto por quebras de linha
    const lines = text.split("\n");
    const elements = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Se a linha estiver vazia, adiciona um espaço entre parágrafos
      if (trimmedLine === "") {
        elements.push(
          <div key={`space-${index}`} className="paragraph-space" />
        );
      } else {
        // Retorna a linha como um parágrafo
        elements.push(
          <p key={index} className="description-paragraph">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  // Funções da galeria
  const nextImage = () => {
    if (add.images && add.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % add.images.length);
    }
  };

  const prevImage = () => {
    if (add.images && add.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? add.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="adsPage">
      <div className="ads-header">
        <div className="ads-header-content">
          <h1 className="ads-title">{add.title}</h1>
          <div className="ads-reference">
            <span>Ref:</span> {add.referenceAds}
          </div>
        </div>
        {add.price && (
          <div className="ads-price-badge">
            <FontAwesomeIcon icon={faMoneyBillWave} className="price-icon" />
            <div className="price-content">
              <span className="price-label">
                {add.methodOfSale === "Aluguel" ? "Aluguel" : "Venda"}
              </span>
              <p className="price-value">
                {add.methodOfSale === "Aluguel" ? `${newPrice}/mês` : newPrice}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="ads-main-content">
        <div className="carousel-section">
          {add.images && add.images.length > 0 ? (
            <div className="gallery-container">
              <div className="gallery-main-image">
                {validImages[currentImageIndex] !== false ? (
                  <img
                    src={`${uploads}/ads/${add.images[currentImageIndex]}`}
                    alt={`${add.title} - Foto ${currentImageIndex + 1}`}
                    className="main-image"
                    onError={() => handleImageError(currentImageIndex)}
                    onLoad={() => handleImageLoad(currentImageIndex)}
                  />
                ) : (
                  <img
                    src={anuncioSemImagem}
                    alt="Anúncio sem imagem"
                    className="main-image"
                  />
                )}

                {add.images.length > 1 && (
                  <>
                    <button
                      className="gallery-nav-button gallery-prev"
                      onClick={prevImage}
                      aria-label="Imagem anterior"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      className="gallery-nav-button gallery-next"
                      onClick={nextImage}
                      aria-label="Próxima imagem"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <div className="gallery-counter">
                      {currentImageIndex + 1} / {add.images.length}
                    </div>
                  </>
                )}
              </div>

              {add.images.length > 1 && (
                <div className="gallery-thumbnails">
                  <div className="thumbnails-track">
                    {add.images.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => goToImage(index)}
                      >
                        <img
                          src={`${uploads}/ads/${image}`}
                          alt={`Miniatura ${index + 1}`}
                          onError={(e) => {
                            e.target.src = anuncioSemImagem;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="gallery-container">
              <div className="gallery-main-image">
                <img
                  src={anuncioSemImagem}
                  alt="Anúncio sem imagem"
                  className="main-image"
                />
              </div>
            </div>
          )}

          <div className="ads-features">
            {add.bedrooms !== null && add.bedrooms > 0 && (
              <div className="feature-item">
                <FontAwesomeIcon icon={faBed} className="feature-icon" />
                <span className="feature-value">{add.bedrooms}</span>
                <span className="feature-label">
                  {add.bedrooms === 1 ? "Quarto" : "Quartos"}
                </span>
              </div>
            )}
            {add.bathrooms !== null && add.bathrooms > 0 && (
              <div className="feature-item">
                <FontAwesomeIcon icon={faBath} className="feature-icon" />
                <span className="feature-value">{add.bathrooms}</span>
                <span className="feature-label">
                  {add.bathrooms === 1 ? "Banheiro" : "Banheiros"}
                </span>
              </div>
            )}
            {add.carVacancies !== null && add.carVacancies > 0 && (
              <div className="feature-item">
                <FontAwesomeIcon icon={faCar} className="feature-icon" />
                <span className="feature-value">{add.carVacancies}</span>
                <span className="feature-label">
                  {add.carVacancies === 1 ? "Vaga" : "Vagas"}
                </span>
              </div>
            )}
            {add.landMeasurement !== null && add.landMeasurement > 0 && (
              <div className="feature-item">
                <FontAwesomeIcon icon={faRuler} className="feature-icon" />
                <span className="feature-value">{add.landMeasurement}</span>
                <span className="feature-label">m²</span>
              </div>
            )}
          </div>
        </div>

        <div className="ads-info-section">
          {add.description && (
            <div className="info-card">
              <h3 className="info-card-title">Descrição</h3>
              <div className="description-text">
                {formatDescription(add.description)}
              </div>
            </div>
          )}

          <div className="info-card">
            <h3 className="info-card-title">
              <FontAwesomeIcon icon={faHome} /> Detalhes do Imóvel
            </h3>
            <div className="info-grid">
              {add.typeOfRealty && (
                <div className="info-item">
                  <span className="info-label">Tipo:</span>
                  <span className="info-value">{add.typeOfRealty}</span>
                </div>
              )}
              {add.methodOfSale && (
                <div className="info-item">
                  <span className="info-label">Negócio:</span>
                  <span className="info-value">{add.methodOfSale}</span>
                </div>
              )}
              {add.landMeasurement && (
                <div className="info-item">
                  <span className="info-label">Área:</span>
                  <span className="info-value">{add.landMeasurement}m²</span>
                </div>
              )}
            </div>
          </div>
          <div className="info-card">
            <h3 className="info-card-title">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Localização
            </h3>
            <div className="location-info">
              {add.address && add.addressNumber && (
                <p className="location-address">
                  {add.address}, {add.addressNumber}
                  {add.complement && `, ${add.complement}`}
                </p>
              )}
              {add.district && (
                <p className="location-detail">
                  <strong>Bairro:</strong> {add.district}
                </p>
              )}
              {add.city && (
                <p className="location-detail">
                  <strong>Cidade:</strong> {add.city}
                </p>
              )}
              <a
                href={`https://www.google.com/maps?q=${add.address}, ${add.addressNumber},${add.district},${add.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Ver localização no mapa
              </a>
            </div>
          </div>

          <div className="contact-card">
            <h3 className="contact-title">Interessado?</h3>
            <p className="contact-subtitle">
              Entre em contato com nossos corretores!
            </p>
            <div className="contact-buttons">
              <a
                className="contact-button whatsapp-button"
                href={`https://wa.me/+55${cleanedNumberWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Whatsapp} alt="Whatsapp" />
                <span>WhatsApp</span>
              </a>
              <a
                className="contact-button phone-button"
                href={`tel:+55${cleanedNumberTell}`}
              >
                <img src={Tell} alt="Telefone" />
                <span>Ligar agora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
