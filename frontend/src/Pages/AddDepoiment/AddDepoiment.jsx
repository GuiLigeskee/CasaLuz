import "./AddDepoiment.css";

// Components
import Message from "../../Components/Messages/Message";
import Loading from "../../Components/Loading/Loading";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Redux
import { publishDepoiment } from "../../Slice/depoimentSlice";

const AddDepoiment = () => {
  const { loading, error, message } = useSelector((state) => state.depoiments);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [depoimentImages, setDepoimentImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setIsErrorMessageOpen(true);
    }
    if (message) {
      setIsSuccessMessageOpen(true);
    }
  }, [error, message]);

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

  const closeErrorMessage = () => {
    setIsErrorMessageOpen(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessMessageOpen(false);
  };

  return (
    <div className="AddDepoiment">
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
      <h1>Adicionar depoimento de cliente</h1>
      <h3>Preencha o formulário para adicionar um novo depoimento</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="arquivo" className="foto-perfil">
          <span id="buttonFile">Carregar imagem do depoimento</span>
          <input
            type="file"
            onChange={handleFile}
            name="arquivo"
            id="arquivo"
          />
        </label>
        <div className="imagePreviews">
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index + 1}`} />
          ))}
        </div>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            placeholder="Título do depoimento"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Depoimento:</span>
          <textarea
            name="description"
            placeholder="Descreva o depoimento"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        {!loading ? (
          <input type="submit" value="Adicionar depoimento" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}

        {loading && <Loading />}
      </form>
    </div>
  );
};

export default AddDepoiment;
