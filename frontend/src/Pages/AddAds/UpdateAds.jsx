import "./AddAds.css";
import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";
import { useParams } from "react-router-dom";

// Redux
import { updateAds, getAdsDetails } from "../../Slice/adsSlice";

// Components
import Message from "../../Components/Messages/Message";

const UpdateAds = () => {
  const { id } = useParams();

  const { admin } = useSelector((state) => state.auth.admin);

  const { add, loading, error, message } = useSelector((state) => state.ads);

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("");
  const [landMeasurement, setLandMeasurement] = useState(null);
  const [price, setPrice] = useState(null);
  const [adsImages, setAdsImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // load button TESTE
  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (add && add.images) {
      setExistingImages(add.images);
    }
  }, [add]);

  // fill button form TESTE
  useEffect(() => {
    if (add) {
      setTitle(add.title);
      setDescription(add.description);
      setAddress(add.address);
      setDistrict(add.district);
      setCity(add.city);
      setLandMeasurement(add.landMeasurement);
      setMethodOfSale(add.methodOfSale);
      setPrice(add.price);
      setTell(add.tell);
      setWhatsapp(add.whatsapp);
      setTypeOfRealty(add.typeOfRealty);
    }
  }, [add]);

  const handleFile = (e) => {
    const files = e.target.files;

    const newImages = [];
    const newImagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newImages.push(URL.createObjectURL(file));
      newImagePreviews.push(file);
    }

    // Combine as novas imagens com as imagens existentes
    setAdsImages((prevImages) => [...prevImages, ...newImagePreviews]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addData = {
      title,
      id,
    };

    if (description) {
      addData.description = description;
    }

    if (address) {
      addData.address = address;
    }

    if (district) {
      addData.district = district;
    }

    if (city) {
      addData.city = city;
    }

    if (typeOfRealty) {
      addData.typeOfRealty = typeOfRealty;
    }

    if (methodOfSale) {
      addData.methodOfSale = methodOfSale;
    }

    if (price) {
      addData.price = price;
    }

    if (landMeasurement) {
      addData.landMeasurement = landMeasurement;
    }

    if (tell) {
      addData.tell = tell;
    }

    if (whatsapp) {
      addData.whatsapp = whatsapp;
    }

    // Construir formData apenas com os dados do add
    const formData = new FormData();
    Object.keys(addData).forEach((key) => formData.append(key, addData[key]));

    // Verificar se há novas fotos adicionadas
    if (adsImages.length > 0) {
      // Inclua as imagens existentes
      for (let i = 0; i < existingImages.length; i++) {
        formData.append("images", existingImages[i]);
      }

      // Adicione as novas imagens
      for (let i = 0; i < adsImages.length; i++) {
        formData.append("images", adsImages[i]);
      }
    } else {
      // Se não houver novas imagens, apenas inclua as imagens existentes
      for (let i = 0; i < existingImages.length; i++) {
        formData.append("images", existingImages[i]);
      }
    }

    console.log(formData);
    dispatch(updateAds(formData));
    resetMessage();
  };

  return (
    <div className="updateAds">
      <h1>
        <span>Atualizar</span> anúncio de imóvel
      </h1>
      <h3>Altere os campos abaixo para atualizar o anúncio</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="arquivo" className="foto-perfil">
          <span id="buttonFile">Carregar imagens do imóvel</span>
          <input
            type="file"
            onChange={handleFile}
            name="arquivo"
            id="arquivo"
            multiple
          />
        </label>
        <div className="imagePreviews">
          {add.images &&
            add.images.map((image, index) => (
              <img
                key={index}
                src={`${uploads}/ads/${image}`}
                alt={`${add.title} - Foto ${index + 1}`}
              />
            ))}
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index + 1}`} />
          ))}
        </div>
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
          <span>Tamanho do imóvel (m2)</span>
          <input
            type="number"
            placeholder="tamanho"
            onChange={(e) => setLandMeasurement(e.target.value)}
            value={landMeasurement}
            required
          />
        </label>
        <label>
          <span>Preço do imóvel</span>
          <input
            type="number"
            placeholder="preço"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
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
          <input
            type="text"
            placeholder="telefone"
            onChange={(e) => setTell(e.target.value)}
            value={tell || ""}
            required
          />
        </label>
        <label>
          <span>Whatsapp do vendedor</span>
          <input
            type="text"
            placeholder="whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
            value={whatsapp || ""}
            required
          />
        </label>
        {!loading && <input type="submit" value="Atualizar anúncio" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default UpdateAds;
