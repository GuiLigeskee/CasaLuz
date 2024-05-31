import "./AddAds.css";

// Components
import Message from "../../Components/Messages/Message";
import MaskedInput from "react-text-mask";
import { NumericFormat } from "react-number-format";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Redux
import { updateAds, getAdsDetails } from "../../Slice/adsSlice";

const UpdateAds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { add, loading, error, message } = useSelector((state) => state.ads);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [typeOfRealty, setTypeOfRealty] = useState("");
  const [methodOfSale, setMethodOfSale] = useState("");
  const [landMeasurement, setLandMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    dispatch(getAdsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (add) {
      setTitle(add.title || "");
      setTypeOfRealty(add.typeOfRealty || "");
      setDescription(add.description || "");
      setPrice(add.price || "");
      setZipCode(add.zipCode || "");
      setAddress(add.address || "");
      setDistrict(add.district || "");
      setCity(add.city || "");
      setMethodOfSale(add.methodOfSale || "");
      setLandMeasurement(add.landMeasurement || "");
      setTell(add.tell || "");
      setWhatsapp(add.whatsapp || "");
      setBathrooms(add.bathrooms || "");
      setBedrooms(add.bedrooms || "");
    }
  }, [add]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("typeOfRealty", typeOfRealty);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("zipCode", zipCode);
    formData.append("address", address);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("methodOfSale", methodOfSale);
    formData.append("landMeasurement", landMeasurement);
    formData.append("tell", tell);
    formData.append("whatsapp", whatsapp);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);

    // Verifique se novas imagens foram selecionadas
    if (newImages.length > 0) {
      // Se sim, adicione as novas imagens ao FormData
      newImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    dispatch(updateAds(formData));
    navigate(`/ads/${id}`);
  };

  return (
    <div className="updateAds">
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
            onChange={(e) => {
              const files = e.target.files;
              const previews = [];
              setNewImages(Array.from(files));
              for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  previews.push(e.target.result);
                  if (previews.length === files.length) {
                    setImagePreviews(previews);
                  }
                };
                reader.readAsDataURL(files[i]);
              }
            }}
          />
        </label>
        {/*Renderize os previews das imagens selecionadas*/}
        <div className="imagePreviews">
          {imagePreviews.map((preview, index) => (
            <div key={index}>
              <img src={preview} alt={`Imagem ${index}`} />
            </div>
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
          <span>CEP</span>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            type="text"
            placeholder="CEP"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode || ""}
            required
          />
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
            value={landMeasurement || ""}
            required
          />
        </label>
        <label>
          <span>Quartos</span>
          <input
            type="number"
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
            placeholder="banheiros"
            onChange={(e) => setBathrooms(e.target.value)}
            value={bathrooms || ""}
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
