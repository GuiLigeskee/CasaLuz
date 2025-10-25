import "./Carousel.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({
  children,
  itemsPerView = 4,
  autoplay = true,
  autoplayDelay = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  // Responsividade
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1050) {
        setItemsToShow(Math.min(2, itemsPerView));
      } else if (window.innerWidth < 1350) {
        setItemsToShow(Math.min(3, itemsPerView));
      } else {
        setItemsToShow(itemsPerView);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Recalcular quando mudar itemsToShow
  useEffect(() => {
    const newMaxIndex = Math.max(0, totalItems - itemsToShow);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [itemsToShow, totalItems, currentIndex]);

  // Navegação
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newMaxIndex = Math.max(0, totalItems - itemsToShow);
      if (prevIndex >= newMaxIndex) {
        return 0; // Volta para o início
      }
      return prevIndex + 1;
    });
  }, [totalItems, itemsToShow]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newMaxIndex = Math.max(0, totalItems - itemsToShow);
      if (prevIndex <= 0) {
        return newMaxIndex; // Vai para o final
      }
      return prevIndex - 1;
    });
  }, [totalItems, itemsToShow]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || totalItems <= itemsToShow) return;

    autoplayRef.current = setInterval(goToNext, autoplayDelay);
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayDelay, goToNext, totalItems, itemsToShow]);

  // Pausar autoplay durante drag
  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const resumeAutoplay = () => {
    if (autoplay && totalItems > itemsToShow) {
      autoplayRef.current = setInterval(goToNext, autoplayDelay);
    }
  };

  // Funções de arraste
  const getPositionX = (event) => {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  };

  const handleDragStart = (event) => {
    pauseAutoplay();
    setIsDragging(true);
    setStartPos(getPositionX(event));
    if (trackRef.current) {
      trackRef.current.style.cursor = "grabbing";
    }
  };

  const handleDragMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 50; // Pixels necessários para trocar slide

    if (movedBy < -threshold && currentIndex < maxIndex) {
      goToNext();
    } else if (movedBy > threshold && currentIndex > 0) {
      goToPrev();
    }

    setCurrentTranslate(prevTranslate);

    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }

    resumeAutoplay();
  };

  // Atualizar prevTranslate quando currentIndex mudar
  useEffect(() => {
    const itemWidth = trackRef.current
      ? trackRef.current.offsetWidth / itemsToShow
      : 0;
    const newTranslate = -currentIndex * itemWidth;
    setPrevTranslate(newTranslate);
    setCurrentTranslate(newTranslate);
  }, [currentIndex, itemsToShow]);

  const showControls = totalItems > itemsToShow;
  const itemWidth = 100 / itemsToShow;

  return (
    <div className="custom-carousel">
      <div className="carousel-container">
        {showControls && (
          <button
            className="carousel-button carousel-button-prev"
            onClick={goToPrev}
            aria-label="Anterior"
          >
            <FaChevronLeft />
          </button>
        )}

        <div className="carousel-viewport">
          <div
            ref={trackRef}
            className="carousel-track"
            style={{
              transform: `translateX(${-currentIndex * itemWidth}%)`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {children.map((child, index) => (
              <div
                key={index}
                className="carousel-item"
                style={{ width: `${itemWidth}%` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <button
            className="carousel-button carousel-button-next"
            onClick={goToNext}
            aria-label="Próximo"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* {showControls && (
        <div className="carousel-dots">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Carousel;
