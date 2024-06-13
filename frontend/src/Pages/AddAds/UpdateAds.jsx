import "./AddAds.css";

// Components
import Message from "../../Components/Messages/Message";
import MaskedInput from "react-text-mask";
import { NumericFormat } from "react-number-format";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
    }
  }, [add]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceNumber = parseStringToNumber(price);

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

    if (newImages.length > 0) {
      newImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    dispatch(updateAds(formData));
    navigate(`/ads/${id}`);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
    setNewImages(files);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPreviews = Array.from(imagePreviews);
    const [removed] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, removed);
    setImagePreviews(reorderedPreviews);

    const reorderedImages = Array.from(newImages);
    const [removedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removedImage);
    setNewImages(reorderedImages);
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

  // Converte String em Number
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

      <h1>
        <span>Atualizar</span> anúncio de imóvel
      </h1>
      <h3>Altere os campos abaixo para atualizar o anúncio</h3>
      <form onSubmit={handleSubmit}>
        <p className="alert">
          Caso for atualizar o anúncio, adicione novamente as imagens do imóvel.
        </p>
        <label>
          <span id="buttonFile">Carregar imagens do imóvel</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="imagePreviews" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="imagePreviews"
              >
                {imagePreviews.map((preview, index) => (
                  <Draggable
                    key={index}
                    draggableId={`preview-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="imagePreviewContainer"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="imagePreview"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <label>
          <span>Título do anúncio</span>
          <input
            type="text"
            placeholder="título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </label>
        <label>
          <span>Descrição do imóvel</span>
          <textarea
            placeholder="Escreva o depoimento"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Categoria do imóvel</span>
          <select
            onChange={(e) => setTypeOfRealty(e.target.value)}
            value={typeOfRealty || ""}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </label>
        <label>
          <span>CEP</span>
          <div className="label-input-button">
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              type="text"
              placeholder="CEP"
              onChange={(e) => setZipCode(e.target.value)}
              value={zipCode || ""}
              required
            />
            <button onClick={openModal}>Pesquisar CEP</button>
          </div>
        </label>
        <label>
          <span>Endereço</span>
          <input
            type="text"
            placeholder="endereço"
            onChange={(e) => setAddress(e.target.value)}
            value={address || ""}
            required
          />
        </label>
        <label>
          <span>Número de endereço:</span>
          <input
            maxLength={10}
            type="text"
            placeholder="Número"
            onChange={(e) => setAddressNumber(e.target.value)}
            value={addressNumber || ""}
            required
          />
        </label>
        <label>
          <span>Complemento:</span>
          <input
            type="text"
            placeholder="Complemento"
            onChange={(e) => setComplement(e.target.value)}
            value={complement || ""}
          />
        </label>
        <label>
          <span>Bairro</span>
          <input
            type="text"
            placeholder="bairro"
            onChange={(e) => setDistrict(e.target.value)}
            value={district || ""}
            required
          />
        </label>
        <label>
          <span>Cidade</span>
          <input
            type="text"
            placeholder="cidade"
            onChange={(e) => setCity(e.target.value)}
            value={city || ""}
            required
          />
        </label>
        <label>
          <span>Estado</span>
          <input
            type="text"
            placeholder="Estado"
            onChange={(e) => setStateAddress(e.target.value)}
            value={stateAddress || ""}
            required
          />
        </label>
        <label>
          <span>Tamanho do imóvel (m2)</span>
          <input
            type="number"
            placeholder="tamanho"
            onChange={(e) => setLandMeasurement(e.target.value)}
            value={landMeasurement || ""}
            required
          />
        </label>
        <label>
          <span>Quartos</span>
          <input
            type="number"
            min={0}
            placeholder="quartos"
            onChange={(e) => setBedrooms(e.target.value)}
            value={bedrooms || ""}
            required
          />
        </label>
        <label>
          <span>Banheiros</span>
          <input
            type="number"
            min={0}
            placeholder="banheiros"
            onChange={(e) => setBathrooms(e.target.value)}
            value={bathrooms || ""}
            required
          />
        </label>
        <label>
          <span>Vagas de Carro</span>
          <input
            type="number"
            min={0}
            placeholder="Vagas de Carro"
            onChange={(e) => setCarVacancies(e.target.value)}
            value={carVacancies || ""}
            required
          />
        </label>
        <label>
          <span>Preço do imóvel</span>
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale
            onChange={(e) => setPrice(e.target.value)}
            value={price || ""}
            placeholder="preço"
            required
          />
        </label>
        <label>
          <span>Método de negócio</span>
          <select
            onChange={(e) => setMethodOfSale(e.target.value)}
            value={methodOfSale || ""}
            required
          >
            <option value="">Selecione um método</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
            <option value="Aluguel e venda">Aluguel e venda</option>
          </select>
        </label>
        <label>
          <span>Telefone do vendedor</span>
          <MaskedInput
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            type="text"
            placeholder="Telefone"
            onChange={(e) => setTell(e.target.value)}
            value={tell || ""}
            required
          />
        </label>
        <label>
          <span>Whatsapp do vendedor</span>
          <MaskedInput
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            type="text"
            placeholder="Whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
            value={whatsapp || ""}
            required
          />
        </label>
        {!loading ? (
          <input type="submit" value="Atualizar anúncio" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default UpdateAds;
