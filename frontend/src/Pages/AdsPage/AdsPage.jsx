import "./AdsPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { uploads } from "../../utils/config";
import Whatsapp from "../../assets/whatsapp.svg";
import Tell from "../../assets/phone.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faMapMarkerAlt,
  faCar,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAdsDetailsByReference } from "../../Slice/adsSlice";

const AdsPage = () => {
  const { referenceAds } = useParams();
  const dispatch = useDispatch();
  const { add } = useSelector((state) => state.ads);
  const [newPrice, setNewPrice] = useState();

  const cleanedNumberWhatsapp =
    add.whatsapp && add.whatsapp.replace(/[()\s-]/g, "");
  const cleanedNumberTell = add.tell && add.tell.replace(/[()\s-]/g, "");

  useEffect(() => {
    dispatch(getAdsDetailsByReference(referenceAds));
  }, [dispatch, referenceAds]);

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

  return (
    <div className="adsPage">
      <div>
        <h2 className="ads-title">{add.title}</h2>
      </div>
      <div className="carousel-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {add.images &&
            add.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  src={`${uploads}/ads/${image}`}
                  alt={`${add.title} - Foto ${index + 1}`}
                  className="carousel-img"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="addDetails-container">
          {add.bedrooms !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faBed} className="icon" />
              <p>{add.bedrooms}</p>
            </div>
          )}
          {add.bathrooms !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faBath} className="icon" />
              <p>{add.bathrooms}</p>
            </div>
          )}
          {add.carVacancies !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faCar} className="icon" />
              <p>{add.carVacancies}</p>
            </div>
          )}
          {add.landMeasurement !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faRuler} className="icon" />
              <p>{add.landMeasurement}m2</p>
            </div>
          )}
        </div>
      </div>
      <div className="details-container">
        <div className="details-flex">
          {add.price && (
            <label id="price">
              {/* <span>Preço:</span> */}
              {add.methodOfSale === "Aluguel" ? (
                <p>{newPrice}\mês</p>
              ) : (
                <p>{newPrice}</p>
              )}
            </label>
          )}
          {add.referenceAds && (
            <label>
              <span>Referencia do anúncio:</span>
              <p>{add.referenceAds}</p>
            </label>
          )}
          {add.description && (
            <label>
              <span>Descrição</span>
              <p>{add.description}</p>
            </label>
          )}
          {add.typeOfRealty && (
            <label>
              <span>Tipo de imóvel:</span>
              <p>{add.typeOfRealty}</p>
            </label>
          )}
          {add.methodOfSale && (
            <label>
              <span>Método de venda:</span>
              <p>{add.methodOfSale}</p>
            </label>
          )}
          {add.landMeasurement && (
            <label>
              <span>Tamanho do imóvel:</span>
              <p>{add.landMeasurement}m2</p>
            </label>
          )}
          {add.address && add.addressNumber && add.complement ? (
            <label>
              <span>Endereço:</span>
              <p>{`${add.address}, ${add.addressNumber}, ${add.complement}`}</p>
            </label>
          ) : (
            <label>
              <span>Endereço:</span>
              <p>{`${add.address}, ${add.addressNumber}`}</p>
            </label>
          )}
          {add.district && (
            <label>
              <span>Bairro:</span>
              <p>{add.district}</p>
            </label>
          )}
          {add.city && (
            <label>
              <span>Cidade:</span>
              <p>{add.city}</p>
            </label>
          )}
        </div>
      </div>
      <div className="contact-section">
        <h3>Gostou do que viu?</h3>
        <h4>Entre em contato com nossos corretores!</h4>
        <div className="contact-buttons">
          <a
            id="contact-button"
            href={`https://wa.me/+55${cleanedNumberWhatsapp}`}
            target="blank"
          >
            <img src={Whatsapp} alt="Whatsapp" />
            <p>Whatsapp</p>
          </a>
          <a
            id="contact-button"
            href={`tel:+55${cleanedNumberTell}`}
            target="_blank"
          >
            <img src={Tell} alt="Telefone" />
            <p>Telefone</p>
          </a>
        </div>
      </div>
      <div>
        <a
          href={`https://www.google.com/maps?q=${add.address}, ${add.addressNumber},${add.district},${add.city}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="addMaps">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <p>Ver no mapa</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdsPage;
