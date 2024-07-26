import "./AddAds.css";

// Components
import Message from "../../Components/Messages/Message";
import MaskedInput from "react-text-mask";
import { NumericFormat } from "react-number-format";
import Modal from "react-modal";
import Spinner from "../../Components/Spinner/Spinner";
import ImageUploader from "../../Components/ImageUploader/ImageUploader";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

// Redux
import { publishAds } from "../../Slice/adsSlice";
import {
  getZipCode,
  resetZipCode,
  selectZipCodeApi,
  selectZipCodeError,
} from "../../Slice/zipCodeSlice";

Modal.setAppElement("#root");

const AddAds = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.ads);

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
  const [adsImages, setAdsImages] = useState([]);
  const imageUrls = useRef([]);

  const handleImageChange = (imageList) => {
    setAdsImages(imageList.map((image) => image.file));
    imageUrls.current = imageList.map((image) => ({
      data_url: image.data_url,
      file: image.file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceNumber = parseStringToNumber(price);

    const adsData = {
      title,
      typeOfRealty,
      description,
      price: priceNumber,
      zipCode,
      address,
      addressNumber,
      complement,
      district,
      city,
      stateAddress,
      methodOfSale,
      landMeasurement,
      tell,
      whatsapp,
      bedrooms,
      bathrooms,
      carVacancies,
    };

    const formData = new FormData();
    for (const key in adsData) {
      formData.append(key, adsData[key]);
    }

    for (let i = 0; i < adsImages.length; i++) {
      formData.append("images", adsImages[i]);
    }

    dispatch(publishAds(formData));
  };

  useEffect(() => {
    if (error) {
      setIsErrorMessageOpen(true);
    }
    if (message) {
      setIsSuccessMessageOpen(true);
    }
  }, [error, message]);

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

  const handleZipCode = async () => {
    const cleanedZipCode = zipCode.replace(/[^0-9]/g, "");
    if (cleanedZipCode.length !== 8) {
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
    <div className="createAds">
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
        <span>Adicionar</span> anúncio de imóvel
      </h1>
      <h3>Preencha os campos abaixo para criar um anúncio</h3>

      <ImageUploader
        initialImages={imageUrls.current}
        onChange={handleImageChange}
        typePage={"CREATE"}
      />

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Título do anúncio"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
          />
        </label>
        <label>
          <span>Tipo de imóvel:</span>
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
          <span>Descrição do imóvel:</span>
          <textarea
            name="description"
            placeholder="Descreva o imóvel"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </label>
        <label>
          <span>Valor do imóvel:</span>
          <NumericFormat
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Digite o valor do imóvel"
            required
          />
        </label>
        <label>
          <span>CEP:</span>
          <div className="label-input-button">
            <MaskedInput
              mask={[
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/,
                /[0-9]/,
              ]}
              placeholder="Digite o CEP"
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <button onClick={openModal}>Pesquisar CEP</button>
          </div>
        </label>
        <label>
          <span>Endereço:</span>
          <input
            type="text"
            name="address"
            placeholder="Digite o endereço"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Número de endereço:</span>
          <input
            type="text"
            name="addressNumber"
            maxLength={10}
            placeholder="Digite o número"
            value={addressNumber || ""}
            onChange={(e) => setAddressNumber(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Complemento:</span>
          <input
            type="text"
            name="complement"
            placeholder="Digite o complemento"
            value={complement || ""}
            onChange={(e) => setComplement(e.target.value)}
          />
        </label>
        <label>
          <span>Bairro:</span>
          <input
            type="text"
            name="district"
            placeholder="Digite o bairro"
            value={district || ""}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cidade:</span>
          <input
            type="text"
            name="city"
            placeholder="Digite a cidade"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Estado:</span>
          <input
            type="text"
            name="stateAddress"
            placeholder="Digite o estado"
            value={stateAddress || ""}
            onChange={(e) => setStateAddress(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Área do imóvel (m²):</span>
          <input
            type="number"
            name="landMeasurement"
            placeholder="Digite a área do imóvel em metros quadrados"
            value={landMeasurement || ""}
            onChange={(e) => setLandMeasurement(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Quantidade de quartos:</span>
          <input
            type="number"
            name="bedrooms"
            placeholder="Digite a quantidade de quartos"
            min={0}
            value={bedrooms || ""}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Quantidade de banheiros:</span>
          <input
            type="number"
            name="bathrooms"
            placeholder="Digite a quantidade de banheiros"
            min={0}
            value={bathrooms || ""}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Vagas de garagem:</span>
          <input
            type="number"
            name="carVacancies"
            placeholder="Digite a quantidade de vagas de garagem"
            min={0}
            value={carVacancies || ""}
            onChange={(e) => setCarVacancies(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Método de negócio:</span>
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
          <span>Telefone do vendedor:</span>
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
            placeholder="(00) 00000-0000"
            onChange={(e) => setTell(e.target.value)}
            value={tell || ""}
            required
          />
        </label>
        <label>
          <span>Whatsapp do vendedor:</span>
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
            placeholder="(00) 00000-0000"
            onChange={(e) => setWhatsapp(e.target.value)}
            value={whatsapp || ""}
            required
          />
        </label>

        {!loading && <input type="submit" value="Criar anúncio" />}
        {loading && (
          <div className="loading-container">
            <Spinner />
            <input type="submit" disabled value="Aguarde..." />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddAds;
