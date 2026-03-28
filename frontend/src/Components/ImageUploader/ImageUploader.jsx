import "./ImageUploader.css";

// URL da pasta uploads
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import ImageUploading from "react-images-uploading";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import heic2any from "heic2any";

// Icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Anuncio sem imagem
import anuncioSemImagem from "../../assets/add-sem-imagem.png";

const ImageUploader = forwardRef(({ initialImages = [], onChange, typePage }, ref) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const updateInputRef = useRef(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const generateUid = (item, index) => {
    if (item && item.name) return `img_${String(item.name)}_${index}`;
    if (item && item.data_url) return `img_${String(item.data_url).slice(-8)}_${index}`;
    return `img_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  };

  const [isImageValid, setIsImageValid] = useState(true);

  const handleImageError = (e) => {
    e.target.style.opacity = 0.6;
    setIsImageValid(false);
  };

  useEffect(() => {
    if (!initialImages) return;

    const mapped = initialImages.map((img, idx) => {
      // If it's a simple filename string (from server) convert to object
      if (typeof img === "string") {
        return { data_url: `${uploads}/ads/${img}`, file: null, name: img, uid: generateUid({ name: img }, idx) };
      }

      // If it's already an object from ImageUploading, ensure uid exists
      return { ...img, uid: img.uid || generateUid(img, idx) };
    });

    setImages(mapped);
  }, [initialImages, typePage]);

  const handleImageChange = (imageList) => {
    // Ensure each item has a stable uid and mark loading when preview is not ready
    const withUid = (imageList || []).map((img, idx) => ({ ...img, uid: img.uid || generateUid(img, idx), loading: img.data_url ? false : !!img.file }));
    // Immediately set so the uploader shows a preview placeholder quickly
    setImages(withUid);
    if (onChange) onChange(withUid);

    // detect HEIC/HEIF files and convert them to JPEG before finalizing
    const isHeicFile = (file) => {
      if (!file) return false;
      const name = (file.name || "").toLowerCase();
      const type = (file.type || "").toLowerCase();
      return type.includes("heic") || type.includes("heif") || name.endsWith(".heic") || name.endsWith(".heif");
    };

    const blobToDataURL = (blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

    const replaceExt = (filename, ext) => {
      if (!filename) return `converted.${ext}`;
      if (filename.includes(".")) return filename.replace(/\.[^/.]+$/, `.${ext}`);
      return `${filename}.${ext}`;
    };

    (async () => {
      try {
        const converted = await Promise.all(
          withUid.map(async (img, idx) => {
            // if file doesn't exist (remote image) or already has a preview, mark not loading
            if (!img.file) return { ...img, loading: false };
            if (img.data_url && !isHeicFile(img.file)) return { ...img, loading: false };

            // HEIC/HEIF needs conversion to JPEG for preview in many browsers
            if (isHeicFile(img.file)) {
              try {
                const res = await heic2any({ blob: img.file, toType: "image/jpeg", quality: 0.9 });
                const blob = Array.isArray(res) ? res[0] : res;
                const fileName = replaceExt(img.file.name, "jpg");
                const newFile = new File([blob], fileName, { type: "image/jpeg" });
                const data_url = await blobToDataURL(blob);
                return { ...img, file: newFile, data_url, name: fileName, uid: img.uid || generateUid(img, idx), loading: false };
              } catch (err) {
                console.error("HEIC conversion failed for", img.file.name, err);
                return { ...img, loading: false };
              }
            }

            // For other files without data_url, build a data_url using FileReader
            if (!img.data_url && img.file) {
              try {
                const data_url = await blobToDataURL(img.file);
                return { ...img, data_url, uid: img.uid || generateUid(img, idx), loading: false };
              } catch (err) {
                return { ...img, loading: false };
              }
            }

            return { ...img, loading: false };
          })
        );

        setImages(converted);
        if (onChange) onChange(converted);
      } catch (e) {
        // fallback handled by the immediate set above
        console.error("Error during image conversion/preview creation", e);
      }
    })();
  };

  const [itemsPerRow, setItemsPerRow] = useState(4);

  // adjust itemsPerRow on resize to match CSS breakpoints
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1100) setItemsPerRow(4);
      else if (w >= 760) setItemsPerRow(3);
      else setItemsPerRow(2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const srcDroppable = result.source.droppableId; // e.g. images-row-0
    const dstDroppable = result.destination.droppableId;

    const srcRow = parseInt(srcDroppable.split("-").pop(), 10);
    const dstRow = parseInt(dstDroppable.split("-").pop(), 10);

    const srcIndexGlobal = srcRow * itemsPerRow + result.source.index;
    const dstIndexGlobal = dstRow * itemsPerRow + result.destination.index;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(srcIndexGlobal, 1);
    reorderedImages.splice(dstIndexGlobal, 0, movedImage);
    setImages(reorderedImages);
    if (onChange) onChange(reorderedImages);
  };

  // Expõe a função onImageRemoveAll ao componente pai
  useImperativeHandle(ref, () => ({
    removeAllImages: () => {
      setImages([]);
      if (onChange) onChange([]);
    },
  }));

  const getId = (image, index) => {
    if (image && image.uid) return String(image.uid);
    if (image && image.name) return String(image.name);
    if (image && image.data_url) return String(image.data_url);
    if (image && image.file && image.file.name) return String(image.file.name + index);
    return String(index);
  };

  // helper: File/Blob -> data URL
  const blobToDataURL = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // process a single File: convert HEIC/HEIF to JPEG if needed and produce data_url
  const processFile = async (file, idx) => {
    const isHeic = (f) => {
      if (!f) return false;
      const name = (f.name || "").toLowerCase();
      const type = (f.type || "").toLowerCase();
      return type.includes("heic") || type.includes("heif") || name.endsWith(".heic") || name.endsWith(".heif");
    };

    try {
      if (isHeic(file)) {
        const res = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
        const blob = Array.isArray(res) ? res[0] : res;
        const fileName = (file.name || `converted_${idx}`).replace(/\.[^/.]+$/, ".jpg");
        const newFile = new File([blob], fileName, { type: "image/jpeg" });
        const data_url = await blobToDataURL(blob);
        return { data_url, file: newFile, name: fileName, uid: generateUid({ name: fileName }, idx), loading: false };
      }
      const data_url = await blobToDataURL(file);
      return { data_url, file, name: file.name, uid: generateUid({ name: file.name }, idx), loading: false };
    } catch (err) {
      console.error("processFile error", err);
      // fallback: still attempt to create data_url
      try {
        const data_url = await blobToDataURL(file);
        return { data_url, file, name: file.name, uid: generateUid({ name: file.name }, idx), loading: false };
      } catch (e) {
        return { data_url: null, file, name: file.name, uid: generateUid({ name: file.name }, idx), loading: false };
      }
    }
  };

  // handler for the hidden multiple file input
  const handleNativeFiles = async (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    const startIndex = images.length;
    // show placeholders with loading=true immediately
    const placeholders = files.map((f, i) => ({ file: f, data_url: null, name: f.name || `file_${i}`, uid: generateUid({ name: f.name || `file_${i}` }, startIndex + i), loading: true }));
    const interim = [...images, ...placeholders];
    setImages(interim);
    if (onChange) onChange(interim);

    const processed = await Promise.all(files.map((f, i) => processFile(f, startIndex + i)));
    const newList = [...images, ...processed];
    setImages(newList);
    if (onChange) onChange(newList);
    e.target.value = null;
  };

  // handler for update single file input (edit existing image)
  const handleUpdateFile = async (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0 || editingIndex === null) return;
    // mark the slot as loading while we process
    const before = [...images];
    before[editingIndex] = { ...(before[editingIndex] || {}), loading: true, data_url: null };
    setImages(before);
    if (onChange) onChange(before);

    const processed = await processFile(files[0], editingIndex);
    const newList = [...before];
    newList[editingIndex] = processed;
    setImages(newList);
    if (onChange) onChange(newList);
    e.target.value = null;
    setEditingIndex(null);
  };

  const handleRemove = (globalIndex) => {
    const newList = images.filter((_, i) => i !== globalIndex);
    setImages(newList);
    if (onChange) onChange(newList);
  };

  const handleRemoveAll = () => {
    setImages([]);
    if (onChange) onChange([]);
  };

  return (
    <div id="ImageUploader">
      <ImageUploading
        multiple
        value={images}
        onChange={handleImageChange}
        maxNumber={40}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png", "webp", "heif", "heic"]}
      >
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
          <div className="uploadImageWrapper">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,image/heic,image/heif"
              multiple
              style={{ display: "none" }}
              onChange={handleNativeFiles}
            />
            <input
              ref={updateInputRef}
              type="file"
              accept="image/*,image/heic,image/heif"
              style={{ display: "none" }}
              onChange={handleUpdateFile}
            />

            <div className="upload-controls">
              <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} className="btn-upload">
                Carregar imagens do imóvel
              </button>
              <button type="button" onClick={handleRemoveAll} className="btn-clear">
                Remover todas as imagens
              </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="image-list">
                {
                  /* create rows based on itemsPerRow */
                }
                {(() => {
                  const rows = [];
                  for (let i = 0; i < images.length; i += itemsPerRow) {
                    rows.push(images.slice(i, i + itemsPerRow));
                  }
                  return rows.map((row, rowIndex) => (
                    <Droppable droppableId={`images-row-${rowIndex}`} direction="horizontal" key={`row-${rowIndex}`}>
                      {(provided) => (
                        <div className="image-row" ref={provided.innerRef} {...provided.droppableProps}>
                          {row.map((image, idx) => {
                            const id = getId(image, idx + rowIndex * itemsPerRow);
                            const globalIndex = rowIndex * itemsPerRow + idx;
                            return (
                              <Draggable key={id} draggableId={id} index={idx}>
                                {(prov, snapshot) => (
                                  <div
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    {...prov.dragHandleProps}
                                    className={`image-item ${snapshot.isDragging ? "dragging" : ""}`}
                                    aria-label={`Imagem ${globalIndex + 1}`}
                                  >
                                    <div className="index-badge">{globalIndex + 1}</div>
                                    <div className="image-thumb-wrapper">
                                      {image && image.loading ? (
                                        <div className="image-placeholder" role="status" aria-live="polite">
                                          <div className="placeholder-box" aria-hidden="true" />
                                          <div className="image-loading">
                                            <div className="spinner" />
                                          </div>
                                        </div>
                                      ) : isImageValid && image && image.data_url ? (
                                        <img src={image.data_url} alt={`Imagem ${globalIndex + 1}`} onError={handleImageError} />
                                      ) : (
                                        <div className="image-placeholder">
                                          <div className="placeholder-box empty" aria-hidden="true" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="image-item-btn-wrapper">
                                      <button
                                        type="button"
                                        aria-label="Editar"
                                        onClick={() => {
                                          setEditingIndex(globalIndex);
                                          if (updateInputRef.current) updateInputRef.current.click();
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                      <button type="button" aria-label="Remover" onClick={() => handleRemove(globalIndex)}>
                                        <FaTrashAlt />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ));
                })()}
              </div>
            </DragDropContext>
          </div>
        )}
      </ImageUploading>
    </div>
  );
});

export default ImageUploader;
