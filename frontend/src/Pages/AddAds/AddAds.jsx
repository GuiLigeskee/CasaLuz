import "./AddAds.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../Components/Messages/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
import { publishAds } from "../../Slice/adsSlice";

const AddAds = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage();

  const { admin } = useSelector((state) => state.auth);

  // const { ads, loading, error, message } = useSelector((state) => state.ads);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tell, setTell] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
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
    };

    const formData = new FormData();

    for (const key in adsData) {
      formData.append(key, adsData[key]);
    }

    for (let i = 0; i < adsImages.length; i++) {
      formData.append("images", adsImages[i]);
    }

    dispatch(publishAds(formData));

    resetMessage();
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
      <h1>Adicionar anúncio de imóvel</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Carregar fotos do imóvel</span>
          <input type="file" onChange={handleFile} multiple />
        </label>
        <div className="imagePreviews">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
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
          <span>Endereço do imóvel</span>
          <input
            type="text"
            placeholder="endereço"
            onChange={(e) => setAddress(e.target.value)}
            value={address || ""}
            required
          />
        </label>
        <label>
          <span>Tamanho do imóvel</span>
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
        <input type="submit" value="criar anúncio" />
      </form>
    </div>
  );
};

export default AddAds;
