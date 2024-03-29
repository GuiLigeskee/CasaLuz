import "./AddAds.css";

// Components
import Message from "../../Components/Messages/Message";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// Redux
import { publishAds } from "../../Slice/adsSlice";

const AddAds = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.ads);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("");
  const [landMeasurement, setLandMeasurement] = useState(0);
  const [price, setPrice] = useState(0);
  const [adsImages, setAdsImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const adsData = {
      title,
      description,
      tell,
      whatsapp,
      address,
      landMeasurement,
      price,
      district,
      city,
      typeOfRealty,
      methodOfSale,
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

  const handleFile = (e) => {
    const files = e.target.files;

    const imagePreviewsArray = [];
    const adsImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      adsImagesArray.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        imagePreviewsArray.push(reader.result);
        if (imagePreviewsArray.length === files.length) {
          setImagePreviews(imagePreviewsArray);
          setAdsImages(adsImagesArray);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="createAds">
      <h1>
        <span>Adicionar</span> anúncio de imóvel
      </h1>
      <h3>Preencha os campos abaixo para criar um anúncio</h3>
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
          <input
            type="text"
            placeholder="descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description || ""}
            required
          />
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
        {!loading && <input type="submit" value="Criar anúncio" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default AddAds;
