import "./Auth.css";

// Components
import Message from "../../Components/Messages/Message";

// Redux
import { register } from "../../Slice/authSlice";

// Hooks
import { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validar se a senha e a confirmação de senha correspondem
    if (password !== confirmPassword) {
      alert("A senha e a confirmação de senha não correspondem.");
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

  return (
    <div id="register">
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
