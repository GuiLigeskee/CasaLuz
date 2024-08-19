import "./ImageUploader.css";

// URL da pasta uploads
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ImageUploading from "react-images-uploading";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Anuncio sem imagem
import anuncioSemImagem from "../../assets/add-sem-imagem.png";

const ImageUploader = forwardRef(
  ({ initialImages = [], onChange, typePage }, ref) => {
    const [images, setImages] = useState([]);

    // Anuncio sem imagem
    const [isImageValid, setIsImageValid] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Anuncio sem imagem
    const handleImageError = () => {
      if (imageLoaded) return;
      setIsImageValid(false);
      setImageLoaded(true);
    };
    const handleImageLoad = () => {
      if (imageLoaded) return;
      setIsImageValid(true);
      setImageLoaded(true);
    };

    useEffect(() => {
      if (initialImages && typePage === "UPDATE") {
        setImages(
          initialImages.map((img) => ({
            data_url: `${uploads}/ads/${img}`,
            file: null,
            name: img,
          }))
        );
      }

      if (initialImages && typePage === "CREATE") {
        setImages(initialImages);
      }
    }, [initialImages, typePage]);

    const handleImageChange = (imageList) => {
      setImages(imageList);
      onChange(imageList);
    };

    const onDragEnd = (result) => {
      if (!result.destination) return;
      const reorderedImages = Array.from(images);
      const [movedImage] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, movedImage);
      setImages(reorderedImages);
      onChange(reorderedImages);
    };

    // Expõe a função onImageRemoveAll ao componente pai
    useImperativeHandle(ref, () => ({
      removeAllImages: () => {
        setImages([]);
        onChange([]);
      },
    }));

    return (
      <div id="ImageUploader">
        <ImageUploading
          multiple
          value={images}
          onChange={handleImageChange}
          maxNumber={40}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
          }) => (
            <div className="uploadImageWrapper">
              <button onClick={onImageUpload}>
                Carregar imagens do imóvel
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>
                Remover todas as imagens
              </button>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="image-list"
                    >
                      {imageList.map((image, index) => (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="image-item"
                            >
                              <span>{index + 1}. </span>
                              {isImageValid ? (
                                <img
                                  src={image.data_url}
                                  alt={`Imagem ${index + 1}`}
                                  onError={handleImageError}
                                  onLoad={handleImageLoad}
                                />
                              ) : (
                                <img
                                  src={anuncioSemImagem}
                                  alt={`Imagem ${index + 1}`}
                                />
                              )}
                              <div className="image-item-btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>
                                  <FaEdit />
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }
);

export default ImageUploader;
