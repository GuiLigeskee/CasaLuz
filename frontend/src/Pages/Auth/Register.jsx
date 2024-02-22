import "./Auth.css";

// Redux
import { register } from "../../Slice/authSlice";

// Hooks
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Hooks/useAuth";

// Components
import Message from "../../Components/Messages/Message";

const Register = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { auth } = useAuth();
  const { admin, message, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminData = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(adminData);

    dispatch(register(JSON.stringify(adminData))); // Converta para JSON aqui
  };

  return (
    <div id="register">
      <h2 id="title">Registrar novo Administrador</h2>
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
            value={name}
            required
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <label>
          <span>Confirmar senha</span>
          <input
            type="password"
            placeholder="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </label>
        <input type="submit" value="Registrar" />
      </form>
    </div>
  );
};

export default Register;
