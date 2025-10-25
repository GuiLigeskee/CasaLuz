import "./Carousel.css";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({
  children,
  itemsPerView = 4,
  autoplay = true,
  autoplayDelay = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  // Responsividade
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1050) {
        setItemsToShow(2);
      } else if (window.innerWidth < 1350) {
        setItemsToShow(3);
      } else {
        setItemsToShow(itemsPerView);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Navegação
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = prevIndex - 1;
      return prevIndexCalc < 0 ? maxIndex : prevIndexCalc;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay || totalItems <= itemsToShow) return;

    const interval = setInterval(goToNext, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, goToNext, totalItems, itemsToShow]);

  // Não mostrar controles se não houver itens suficientes
  const showControls = totalItems > itemsToShow;

  // Calcular dots
  const dotsCount = maxIndex + 1;

  return (
    <div className="custom-carousel">
      <div className="carousel-container">
        {showControls && (
          <button
            className="carousel-button carousel-button-prev"
            onClick={goToPrev}
            disabled={isTransitioning}
            aria-label="Anterior"
          >
            <FaChevronLeft />
          </button>
        )}

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              gridTemplateColumns: `repeat(${totalItems}, ${
                100 / itemsToShow
              }%)`,
            }}
          >
            {children.map((child, index) => (
              <div key={index} className="carousel-item">
                {child}
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <button
            className="carousel-button carousel-button-next"
            onClick={goToNext}
            disabled={isTransitioning}
            aria-label="Próximo"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* {showControls && dotsCount > 1 && (
        <div className="carousel-dots">
          {[...Array(dotsCount)].map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Carousel;
