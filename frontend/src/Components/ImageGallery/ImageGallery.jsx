import React, { useEffect, useState } from "react";
import "./ImageGallery.css";
import { uploads } from "../../utils/config";
import { useSelector, useDispatch } from "react-redux";
import { updateAds, getAdsDetailsByReference } from "../../Slice/adsSlice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ImageGallery = ({ images = [], title = "", adId, reference, onRefresh }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    const mapped = Array.isArray(images)
      ? images.map((name) => ({ id: name, name, src: `${uploads}/ads/${name}` }))
      : [];
    setItems(mapped);
    setCurrentIndex(0);
  }, [images]);

  const nextImage = () => {
    if (items.length > 0) setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    if (items.length > 0)
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToImage = (index) => setCurrentIndex(index);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const imagesOrder = items.map((it) => it.name);
      const formData = new FormData();
      formData.append("id", adId);
      formData.append("imagesOrder", JSON.stringify(imagesOrder));

      await dispatch(updateAds(formData)).unwrap();

      if (reference) {
        dispatch(getAdsDetailsByReference(reference));
      }

      if (onRefresh) onRefresh();
      setReorderMode(false);
      setModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar ordem:", err);
      alert("Erro ao salvar ordem das imagens.");
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        {items && items.length > 0 ? (
          <>
            <div className="main-image-wrapper">
              <img
                src={items[currentIndex].src}
                alt={`${title} - Foto ${currentIndex + 1}`}
                className="main-image"
                onError={(e) => (e.target.style.opacity = 0.6)}
              />
              {items.length > 1 && (
                <>
                  <button className="gallery-nav gallery-prev" onClick={prevImage} aria-label="Anterior">‹</button>
                  <button className="gallery-nav gallery-next" onClick={nextImage} aria-label="Próximo">›</button>
                  <div className="gallery-counter">{currentIndex + 1} / {items.length}</div>
                </>
              )}
            </div>

            {items.length > 1 && (
              <div className="thumbnails-row">
                {items.map((it, i) => (
                  <div
                    key={it.id}
                    className={`thumbnail ${i === currentIndex ? "active" : ""}`}
                    onClick={() => goToImage(i)}
                  >
                    <img src={it.src} alt={`Miniatura ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="main-image-wrapper empty">Sem fotos disponíveis</div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
