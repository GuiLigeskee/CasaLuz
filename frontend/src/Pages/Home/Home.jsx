import "./Home.css";

// Components
import SearchBar from "../../Components/SearchBar/SearchBar";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAds } from "../../Slice/adsSlice";
import { getDepoiments } from "../../Slice/depoimentSlice";
import AdsItem from "../../Components/Ads/AdsItem";
import DepoimentItem from "../../Components/Depoiment/DepoimentItem";

const Home = () => {
  const dispatch = useDispatch();

  const [slidePerView, setSlidePerView] = useState(3);

  const { ads } = useSelector((state) => state.ads);

  const { depoiments } = useSelector((state) => state.depoiments);

  // Load all ads
  useEffect(() => {
    dispatch(getAds(), getDepoiments());
  }, [dispatch]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidePerView(1);
      } else {
        setSlidePerView(3);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="intro-home">
        <div>
          <h1 id="intro-title">
            Descubra <span>seu lar</span> em Curitiba-PR
          </h1>
          <h2>Venda e aluguel de imóveis</h2>
        </div>
        <SearchBar />
      </div>
      {ads && (
        <div className="carroussel-ads">
          <h2 id="carroussel-title">
            Conheça nossos imóveis à <span>venda</span>
          </h2>
          <div className="carousel">
            <Swiper
              slidesPerView={slidePerView}
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
            >
              {ads &&
                ads.map((add) => (
                  <SwiperSlide key={add._id}>
                    <div key={add._id}>
                      <AdsItem add={add} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}

      {ads && (
        <div className="carroussel-ads">
          <h2 id="carroussel-title">
            Conheça nossos imóveis para <span>alugar</span>
          </h2>
          <div className="carousel">
            <Swiper
              slidesPerView={slidePerView}
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
            >
              {ads &&
                ads.map((add) => (
                  <SwiperSlide key={add._id}>
                    <div key={add._id}>
                      <AdsItem add={add} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}

      {depoiments && (
        <div className="carousel-depoiments">
          <h2 id="carroussel-title">
            Veja os <span>depoimentos</span> de nossos clientes
          </h2>
          <div className="carousel">
            <Swiper
              slidesPerView={slidePerView}
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
            >
              {depoiments &&
                depoiments.map((depoiment) => (
                  <SwiperSlide key={depoiment._id}>
                    <div key={depoiment._id}>
                      <DepoimentItem depoiment={depoiment} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
