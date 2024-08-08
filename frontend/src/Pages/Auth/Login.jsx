import "./Auth.css";

// Components
import Logo from "../../assets/logo-casa-luz.png";
import Loading from "../../Components/Loading/Loading";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import { loginValidation } from "../../utils/formValidation";

// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { login, reset } from "../../Slice/authSlice";

const Login = () => {
  const { admin, message, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal da validação do formulario
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Modal de sucesso
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Animação do Modal
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationClosing, setIsAnimationClosing] = useState(false);

  // Validação do formulario
  const [errors, setErrors] = useState({});

  // UseState do Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminData = {
      email,
      password,
    };

    const validationErrors = loginValidation(adminData);
    setErrors(Object.values(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      openErrorModal();
    } else {
      dispatch(login(adminData));
    }
  };

  useEffect(() => {
    if (admin) {
      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 500);

      return () => clearTimeout(redirectTimeout);
    }

    return () => {
      dispatch(reset());
    };
  }, [admin, dispatch, navigate]);

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

  return (
    <div id="login">
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
        type={"LOGIN"}
        msg={message}
        setIsAnimationDone={setIsAnimationDone}
      />

      <div className="logo">
        <img src={Logo} alt="Casa Luz" className="logo" />
      </div>
      <p id="subtitle">Entre para ter acesso a área de administrador</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Seu email:</span>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
        </label>
        <label>
          <span>Sua senha:</span>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>

        {!loading ? (
          <input type="submit" value="Entrar" />
        ) : (
          <input type="submit" disabled value="Aguarde..." />
        )}

        {loading && <Loading />}
      </form>
    </div>
  );
};

export default Login;
