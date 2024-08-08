import "./Auth.css";

// Components
import Loading from "../../Components/Loading/Loading";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import { registerValidation } from "../../utils/formValidation";

// Redux
import { register } from "../../Slice/authSlice";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

const Register = () => {
  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const resetMessage = useResetComponentMessage();

  // Modal da validação do formulario
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Modal de sucesso
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Animação do Modal
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);

  // Validação do formulario
  const [errors, setErrors] = useState({});

  // UseState do Register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createAdmin = {
      name,
      email,
      password,
      confirmPassword,
    };

    const validationErrors = registerValidation(createAdmin);
    setErrors(Object.values(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      openErrorModal();
    } else {
      dispatch(register(createAdmin));
      // resetMessage();
    }
  };

  // UseEffect de erros
  useEffect(() => {
    console.log("Error state:", error); // Log do estado de erro
    console.log("Message state:", message); // Log do estado de mensagem

    if (error) {
      const backendErrors = { error: error };
      setErrors(backendErrors);
      openErrorModal();
    }

    if (message) {
      openSuccessModal();
    }
  }, [error, message]);

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
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div id="register">
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
        type={"REGISTER"}
        msg={message}
        setIsAnimationDone={setIsAnimationDone}
        onResetStates={resetStates}
      />

      <h1 id="title">
        <span>Registrar</span> novo Administrador
      </h1>
      <p id="subtitle">
        Preencha os campos abaixo para registrar um novo administrador
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <label>
          <span>Confirmar senha:</span>
          <input
            type="password"
            placeholder="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword || ""}
          />
        </label>

        {!loading ? (
          <input type="submit" value="Registrar" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}

        {loading && <Loading />}
      </form>
    </div>
  );
};

export default Register;
