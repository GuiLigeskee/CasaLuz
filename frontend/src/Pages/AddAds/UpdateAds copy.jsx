import "./AddAds.css";

// Components
import Message from "../../Components/Messages/Message";
import MaskedInput from "react-text-mask";
import { NumericFormat } from "react-number-format";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Spinner from "../../Components/Spinner/Spinner";
import ImageUploading from "react-images-uploading";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux
import { updateAds, getAdsDetails } from "../../Slice/adsSlice";
import {
  getZipCode,
  resetZipCode,
  selectZipCodeApi,
  selectZipCodeError,
} from "../../Slice/zipCodeSlice";

const UpdateAds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { add, loading, error, message } = useSelector((state) => state.ads);

  // ZipCode da Api
  const zipCodeApi = useSelector(selectZipCodeApi);
  const zipCodeError = useSelector(selectZipCodeError);
  const [messageZipCode, setMessageZipCode] = useState("");

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("");
  const [landMeasurement, setLandMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [carVacancies, setCarVacancies] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      setIsErrorMessageOpen(true);
    }
    if (message) {
      setIsSuccessMessageOpen(true);
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (zipCodeError) {
      setMessageZipCode("CEP não encontrado ou não existe.");
    } else if (zipCodeApi) {
      setMessageZipCode("CEP encontrado com sucesso!");
      setAddress(zipCodeApi.logradouro || "");
      setDistrict(zipCodeApi.bairro || "");
      setCity(zipCodeApi.localidade || "");
      setStateAddress(zipCodeApi.uf || "");
    }
  }, [zipCodeApi, zipCodeError]);

  useEffect(() => {
    if (add) {
      setTitle(add.title || "");
      setTypeOfRealty(add.typeOfRealty || "");
      setDescription(add.description || "");
      setPrice(add.price || "");
      setZipCode(add.zipCode || "");
      setAddress(add.address || "");
      setAddressNumber(add.addressNumber || "");
      setComplement(add.complement || "");
      setDistrict(add.district || "");
      setCity(add.city || "");
      setStateAddress(add.stateAddress || "");
      setMethodOfSale(add.methodOfSale || "");
      setLandMeasurement(add.landMeasurement || "");
      setTell(add.tell || "");
      setWhatsapp(add.whatsapp || "");
      setBathrooms(add.bathrooms || "");
      setBedrooms(add.bedrooms || "");
      setCarVacancies(add.carVacancies || "");
      setImages(add.images.map((img) => ({ data_url: img.url }))); // Supondo que add.images seja um array de URLs de imagens
    }
  }, [add]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let priceNumber = parseStringToNumber(price);

    if (typeof priceNumber !== "string") {
      priceNumber = String(priceNumber);
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("typeOfRealty", typeOfRealty);
    formData.append("description", description);
    formData.append("price", priceNumber);
    formData.append("zipCode", zipCode);
    formData.append("address", address);
    formData.append("addressNumber", addressNumber);
    formData.append("complement", complement);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("stateAddress", stateAddress);
    formData.append("methodOfSale", methodOfSale);
    formData.append("landMeasurement", landMeasurement);
    formData.append("tell", tell);
    formData.append("whatsapp", whatsapp);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("carVacancies", carVacancies);

    if (images.length > 0) {
      images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });
    }

    dispatch(updateAds(formData));
    navigate(`/ads/${id}`);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

  const onImageChange = (imageList) => {
    setImages(imageList);
  };

  // Api CEP
  const handleZipCode = async () => {
    const cleanedZipCode = zipCode.replace(/[^0-9]/g, "");

    if (cleanedZipCode.length !== 8) {
      console.log(cleanedZipCode);
      setMessageZipCode("Por favor, insira um CEP válido.");
      setIsOpen(true);
      return;
    }

    await dispatch(getZipCode(cleanedZipCode));
    setIsOpen(true);
  };

  const openModal = (e) => {
    e.preventDefault();
    handleZipCode();
  };

  const closeModal = () => {
    dispatch(resetZipCode());
    setMessageZipCode("");
    setIsOpen(false);
  };

  const closeErrorMessage = () => {
    setIsErrorMessageOpen(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessMessageOpen(false);
  };

  // Função para converter String em Number
  const parseStringToNumber = (priceStr) => {
    if (!priceStr) return null;
    const cleanedString = priceStr
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".");

    const priceNumber = parseFloat(cleanedString);

    return priceNumber;
  };

  return (
    <div className="updateAds">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Verificação de CEP"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h1>Resultado da Pesquisa</h1>
        {messageZipCode && <p>{messageZipCode}</p>}
        {zipCodeApi && (
          <div>
            <p>
              <strong>Rua:</strong> {zipCodeApi.logradouro}
            </p>
            <p>
              <strong>Bairro:</strong> {zipCodeApi.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {zipCodeApi.localidade}
            </p>
            <p>
              <strong>Estado:</strong> {zipCodeApi.uf}
            </p>
          </div>
        )}

        <button onClick={closeModal}>Fechar</button>
      </Modal>

      <Message
        msg={error}
        type="error"
        isOpen={isErrorMessageOpen}
        onRequestClose={closeErrorMessage}
      />

      <Message
        msg={message}
        type="success"
        isOpen={isSuccessMessageOpen}
        onRequestClose={closeSuccessMessage}
      />

      <div className="image-upload-section">
        <span>Imagens:</span>
        <ImageUploading
          multiple
          value={images}
          onChange={onImageChange}
          maxNumber={10}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Adicionar Imagens
              </button>
              <button onClick={onImageRemoveAll}>Remover Todas</button>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images">
                  {(provided) => (
                    <div
                      className="image-preview"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {imageList.map((image, index) => (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="image-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <img src={image.data_url} alt="" width="100" />
                              <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>
                                  Atualizar
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  Remover
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

      <input
        type="submit"
        value={loading ? "Aguarde..." : "Atualizar"}
        disabled={loading}
      />
    </div>
  );
};

export default UpdateAds;
