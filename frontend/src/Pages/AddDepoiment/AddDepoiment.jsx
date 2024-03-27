import "./AddDepoiment.css";

// Components
import Message from "../../Components/Messages/Message";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// Redux
import { publishDepoiment } from "../../Slice/depoimentSlice";

const AddDepoiment = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [depoimentImages, setDepoimentImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const depoimentData = {
      title,
      description,
    };

    const formData = new FormData();

    for (const key in depoimentData) {
      formData.append(key, depoimentData[key]);
    }

    for (let i = 0; i < depoimentImages.length; i++) {
      formData.append("images", depoimentImages[i]);
    }

    dispatch(publishDepoiment(formData));
  };

  const handleFile = (e) => {
    const files = e.target.files;

    const imagePreviewsArray = [];
    const depoimentImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      depoimentImagesArray.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        imagePreviewsArray.push(reader.result);
        if (imagePreviewsArray.length === files.length) {
          setImagePreviews(imagePreviewsArray);
          setDepoimentImages(depoimentImagesArray);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="AddDepoiment">
      <h1>Adicionar depoimento de cliente</h1>
      <h3>Preencha o formulário para adicionar um novo depoimento</h3>
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
          <span>Titulo</span>
          <input type="text" placeholder="Titulo do depoimento" />
        </label>
        <label>
          <span>Depoimento</span>
          <textarea placeholder="Escreva o depoimento" rows={4}></textarea>
        </label>

        <input type="submit" value="Salvar" />
      </form>
    </div>
  );
};

export default AddDepoiment;
