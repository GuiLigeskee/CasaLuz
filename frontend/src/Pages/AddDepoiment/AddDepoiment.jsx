import "./AddDepoiment.css";

// Components
import Loading from "../../Components/Loading/Loading";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import { depoimentFormValidation } from "../../utils/formValidation";

// Hooks
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Redux
import { publishDepoiment, reset } from "../../Slice/depoimentSlice";

const AddDepoiment = () => {
  const { loading, error, message } = useSelector((state) => state.depoiments);

  const dispatch = useDispatch();

  // Modal da validação do formulario
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Modal de sucesso
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Animação do Modal
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);

  // Validação do formulario
  const [errors, setErrors] = useState({});

  // UseState Depoiment
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [depoimentImages, setDepoimentImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  // Função de Submit Depoiment
  const handleSubmit = (e) => {
    e.preventDefault();

    const depoimentData = {
      title,
      description,
    };

    const validationErrors = depoimentFormValidation(
      depoimentData,
      depoimentImages
    );
    setErrors(Object.values(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      openErrorModal();
    } else {
      const formData = new FormData();

      for (const key in depoimentData) {
        formData.append(key, depoimentData[key]);
      }

      for (let i = 0; i < depoimentImages.length; i++) {
        formData.append("images", depoimentImages[i]);
      }

      dispatch(publishDepoiment(formData));
    }
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

  // Modal da validação do formulario
  const openErrorModal = () => setIsErrorModalOpen(true);
  const closeErrorModal = () => {
    setIsAnimationClosing(true);
    setTimeout(() => {
      setErrors({});
      setIsAnimationDone(false);
      setIsErrorModalOpen(false);
      setIsAnimationClosing(false);
      dispatch(reset());
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
      dispatch(reset());
    }, 300);
  };

  // Função para cadastrar um novo ADS
  const resetStates = () => {
    setTitle("");
    setDescription("");
    setDepoimentImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="AddDepoiment">
      {/* Modal da validação do formulario Frontend */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        errors={errors}
        setIsAnimationDone={setIsAnimationDone}
      />

      {/* Modal de sucesso */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        isAnimationDone={isAnimationDone}
        isAnimationClosing={isAnimationClosing}
        type={"CREATE_DEPOIMENT"}
        msg={message}
        setIsAnimationDone={setIsAnimationDone}
        onResetStates={resetStates}
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
          <span>Título: *</span>
          <input
            type="text"
            name="title"
            placeholder="Título do depoimento"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </label>
        <label>
          <span>Depoimento: *</span>
          <textarea
            name="description"
            placeholder="Descreva o depoimento"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            value={description || ""}
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
