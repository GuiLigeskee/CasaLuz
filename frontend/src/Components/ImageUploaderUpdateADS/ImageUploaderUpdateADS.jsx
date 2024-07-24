import "./ImageUploaderUpdateADS.css";

import { uploads } from "../../utils/config";

import { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ImageUploaderUpdateADS = ({ initialImages = [], onChange }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (initialImages) {
      setImages(
        initialImages.map((img) => ({
          ...img,
          data_url: `${uploads}/ads/${img}`,
        }))
      );
    }
  }, [initialImages]);

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
            <button onClick={onImageUpload}>Carregar imagens do imóvel</button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remover todas as imagens</button>
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
                            <img
                              src={image.data_url}
                              // alt={`Imagem ${index + 1}`}
                            />
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
};

export default ImageUploaderUpdateADS;
