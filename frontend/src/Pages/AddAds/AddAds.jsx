import "./AddAds.css";

// Components
import Loading from "../../Components/Loading/Loading";
import CepModal from "../../Components/CepModal/CepModal";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import ImageUploader from "../../Components/ImageUploader/ImageUploader";
import { adsFormValidation } from "../../utils/formValidation";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { NumericFormat } from "react-number-format";
import MaskedInput from "react-text-mask";

// Redux
import { publishAds } from "../../Slice/adsSlice";
import {
  getZipCode,
  resetZipCode,
  selectZipCodeApi,
  selectZipCodeError,
} from "../../Slice/zipCodeSlice";

const AddAds = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.ads);
  const { loading: loadingZipCode } = useSelector((state) => state.zipCode);

  // ZipCode da Api
  const zipCodeApi = useSelector(selectZipCodeApi);
  const zipCodeError = useSelector(selectZipCodeError);
  const [messageZipCode, setMessageZipCode] = useState("");

  // Modal do CEP
  const [isCepModalOpen, setIsCepModalOpen] = useState(false);

  // Modal da validação do formulario
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Modal de sucesso
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Animação do Modal
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);

  // Validação do formulario
  const [errors, setErrors] = useState({});

  // UseState ADS
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

  // UseEffect de erros
  useEffect(() => {
    if (error) {
      const backendErrors = { error: error };
      setErrors(backendErrors);
      openErrorModal();
    }

    if (message) {
      openSuccessModal();
    }
  }, [error, message]);

  // Função de Submit ADS
  const handleSubmit = (e) => {
    e.preventDefault();

    const priceNumber = parseStringToNumber(price.toString());

    const adsDataCreate = {
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

    const validationErrors = adsFormValidation(adsDataCreate, adsImages);
    setErrors(Object.values(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      openErrorModal();
    } else {
      const formData = new FormData();

      for (const key in adsDataCreate) {
        formData.append(key, adsDataCreate[key]);
      }

      for (let i = 0; i < adsImages.length; i++) {
        formData.append("images", adsImages[i]);
      }

      dispatch(publishAds(formData));
    }
  };

  // Função do ImageUploader
  const handleImageChange = (imageList) => {
    setAdsImages(imageList.map((image) => image.file));
    imageUrls.current = imageList.map((image) => ({
      data_url: image.data_url,
      file: image.file,
    }));
  };

  // Faz a chamada para API CEP
  const handleZipCode = async () => {
    const cleanedZipCode = zipCode.replace(/[^0-9]/g, "");
    if (cleanedZipCode.length !== 8) {
      setMessageZipCode("Por favor, insira um CEP válido.");
      setIsCepModalOpen(true);
      return;
    }

    await dispatch(getZipCode(cleanedZipCode));
    setIsCepModalOpen(true);
  };

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

  // Modal de CEP
  const openCepModal = (e) => {
    e.preventDefault();
    handleZipCode();
  };
  const closeCepModal = () => {
    setIsAnimationClosing(true);
    setTimeout(() => {
      dispatch(resetZipCode());
      setMessageZipCode("");
      setIsAnimationDone(false);
      setIsCepModalOpen(false);
      setIsAnimationClosing(false);
    }, 300);
  };

  // Modal da validação do formulario
  const openErrorModal = () => setIsErrorModalOpen(true);
  const closeErrorModal = () => {
    setIsAnimationClosing(true);
    setTimeout(() => {
      setErrors({});
      setIsAnimationDone(false);
      setIsErrorModalOpen(false);
      setIsAnimationClosing(false);
    }, 300);
  };

  // Modal de sucesso
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setIsAnimationClosing(true);
    setTimeout(() => {
      setIsAnimationDone(false);
      setIsSuccessModalOpen(false);
      setIsAnimationClosing(false);
    }, 300);
  };

  // Função para cadastrar um novo ADS
  const resetStates = () => {
    setTitle("");
    setDescription("");
    setTell("");
    setWhatsapp("");
    setZipCode("");
    setAddress("");
    setAddressNumber("");
    setComplement("");
    setDistrict("");
    setCity("");
    setStateAddress("");
    setTypeOfRealty("");
    setMethodOfSale("");
    setLandMeasurement("");
    setPrice("");
    setBedrooms("");
    setBathrooms("");
    setCarVacancies("");
    setAdsImages([]);
  };

  // Converter a mascara do preço pra number
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
      {/* Modal da validação do formulario Frontend */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        errors={errors}
        setIsAnimationDone={setIsAnimationDone}
      />

      {/* Modal do CEP */}
      <CepModal
        isOpen={isCepModalOpen}
        onClose={closeCepModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        messageZipCode={messageZipCode}
        zipCodeApi={zipCodeApi}
        setIsAnimationDone={setIsAnimationDone}
      />

      {/* Modal de sucesso */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        type={"CREATE_ADS"}
        msg={message}
        setIsAnimationDone={setIsAnimationDone}
        onResetStates={resetStates}
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
          <span>Título: *</span>
          <input
            type="text"
            name="title"
            placeholder="Título do anúncio"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </label>
        <label>
          <span>Tipo de imóvel: *</span>
          <select
            onChange={(e) => setTypeOfRealty(e.target.value)}
            value={typeOfRealty || ""}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </label>
        <label>
          <span>Descrição do imóvel: *</span>
          <textarea
            name="description"
            placeholder="Descreva o imóvel"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </label>
        <label>
          <span>Valor do imóvel: *</span>
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
          />
        </label>
        <label>
          <span>CEP: *</span>
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
            />
            <button onClick={openCepModal}>Pesquisar CEP</button>
          </div>
        </label>
        <label>
          <span>Endereço: *</span>
          <input
            type="text"
            name="address"
            placeholder="Digite o endereço"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          <span>Número de endereço: *</span>
          <input
            type="text"
            name="addressNumber"
            maxLength={10}
            placeholder="Digite o número"
            value={addressNumber || ""}
            onChange={(e) => setAddressNumber(e.target.value)}
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
          <span>Bairro: *</span>
          <input
            type="text"
            name="district"
            placeholder="Digite o bairro"
            value={district || ""}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </label>
        <label>
          <span>Cidade: *</span>
          <input
            type="text"
            name="city"
            placeholder="Digite a cidade"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          <span>Estado: *</span>
          <input
            type="text"
            name="stateAddress"
            placeholder="Digite o estado"
            value={stateAddress || ""}
            onChange={(e) => setStateAddress(e.target.value)}
          />
        </label>
        <label>
          <span>Área do imóvel (m²): *</span>
          <input
            type="number"
            name="landMeasurement"
            placeholder="Digite a área do imóvel em metros quadrados"
            value={landMeasurement || ""}
            onChange={(e) => setLandMeasurement(e.target.value)}
          />
        </label>
        {true && (
          <>
            <label>
              <span>Quantidade de quartos:</span>
              <input
                type="number"
                name="bedrooms"
                placeholder="Digite a quantidade de quartos"
                min={0}
                value={bedrooms || ""}
                onChange={(e) => setBedrooms(e.target.value)}
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
              />
            </label>
          </>
        )}
        <label>
          <span>Método de negócio: *</span>
          <select
            onChange={(e) => setMethodOfSale(e.target.value)}
            value={methodOfSale || ""}
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
          />
        </label>

        {!loading ? (
          <input type="submit" value="Criar anúncio" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}

        {(loading || loadingZipCode) && <Loading />}
      </form>
    </div>
  );
};

export default AddAds;
