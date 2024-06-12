import "./Auth.css";

// Components
import Message from "../../Components/Messages/Message";

// Redux
import { register } from "../../Slice/authSlice";

// Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

const Register = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage();

  const { message, loading, error } = useSelector((state) => state.auth.admin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const adminData = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(adminData));
    resetMessage();
  };

  useEffect(() => {
    if (error) {
      setIsErrorMessageOpen(true);
    }
    if (message) {
      setIsSuccessMessageOpen(true);
    }
  }, [error, message]);

  const closeErrorMessage = () => {
    setIsErrorMessageOpen(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessMessageOpen(false);
  };

  return (
    <div id="register">
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
      <h1 id="title">
        <span>Registrar</span> novo Administrador
      </h1>
      <p id="subtitle">
        Preencha os campos abaixo para registrar um novo administrador
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
            required
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            required
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            required
          />
        </label>
        <label>
          <span>Confirmar senha</span>
          <input
            type="password"
            placeholder="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword || ""}
            required
          />
        </label>
        {!loading && <input type="submit" value="Registrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default Register;
