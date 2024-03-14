// CSS
import "./AdsPage.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { uploads } from "../../utils/config";

// Components

// Hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getAdsDetails } from "../../Slice/adsSlice";

const AdsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { ads, add, loading, error, message } = useSelector(
    (state) => state.ads
  );

  // Load ads data
  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

  return (
    <div className="AdsPage">
      <div>
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {ads.images &&
            ads.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  src={`${uploads}/ads/${image}`}
                  alt={`${ads.title} - Foto ${index + 1}`}
                  className="carousel-img"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="details-container">
          <h2 className="detailsTitle">{ads.title}</h2>
          {ads.description && (
            <label>
              <span>Descrição:</span>
              <p>{ads.description}</p>
            </label>
          )}
          {ads.typeOfRealty && (
            <label>
              <span>Tipo de imóvel:</span>
              <p>{ads.typeOfRealty}</p>
            </label>
          )}
          {ads.price && (
            <label>
              <span>Preço:</span>
              <p>R${ads.price}</p>
            </label>
          )}
          {ads.address && (
            <label>
              <span>Endereço:</span>
              <p>{ads.address}</p>
            </label>
          )}
          {ads.district && (
            <label>
              <span>Bairro:</span>
              <p>{ads.district}</p>
            </label>
          )}
          {ads.city && (
            <label>
              <span>Cidade:</span>
              <p>{ads.city}</p>
            </label>
          )}
          {ads.methodOfSale && (
            <label>
              <span>Método de venda:</span>
              <p>{ads.methodOfSale}</p>
            </label>
          )}
          {ads.landMeasurement && (
            <label>
              <span>Tamanho do imóvel:</span>
              <p>{ads.landMeasurement}m2</p>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
