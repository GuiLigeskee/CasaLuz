// CSS
import "./AdsPage.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Uploads
import { uploads } from "../../utils/config";

// Components
import Whatsapp from "../../assets/whatsapp.svg";
import Tell from "../../assets/phone.svg";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getAdsDetails } from "../../Slice/adsSlice";

const AdsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { add } = useSelector((state) => state.ads);
  const [newPrice, setNewPrice] = useState();

  const cleanedNumberWhatsapp =
    add.whatsapp && add.whatsapp.replace(/[()\s-]/g, "");
  const cleanedNumberTell = add.tell && add.tell.replace(/[()\s-]/g, "");

  // Load ads data
  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

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
      <div className="carousel-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
          <a
            href={`https://www.google.com/maps?q=${add.address},${add.district},${add.city}`}
            target="_blank"
          >
            <div className="addMaps">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <p>Ver no mapa</p>
            </div>
          </a>
          {add.bedrooms !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faBed} className="icon" />
              <span>Quartos:</span>
              <p>{add.bedrooms}</p>
            </div>
          )}
          {add.bathrooms !== undefined && (
            <div className="addDetails">
              <FontAwesomeIcon icon={faBath} className="icon" />
              <span>Banheiros:</span>
              <p>{add.bathrooms}</p>
            </div>
          )}
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
              href={`tell:+55${cleanedNumberTell}`}
              target="_blank"
            >
              <img src={Tell} alt="Telefone" />
              <p>Telefone</p>
            </a>
          </div>
        </div>
      </div>
      <div className="details-container">
        <h2 className="details-title">{add.title}</h2>
        {add.description && (
          <label>
            <span>Descrição:</span>
            <p>{add.description}</p>
          </label>
        )}
        <div className="details-flex">
          {add.price && (
            <label>
              <span>Preço:</span>
              <p>{newPrice}</p>
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
    </div>
  );
};

export default AdsPage;
