import "./Auth.css";

// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
import { login, reset } from "../../Slice/authSlice";

// Components
import Message from "../../Components/Messages/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // const resetMessage = useResetComponentMessage(dispatch);

  const navigate = useNavigate();

  const { admin, message, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const createAdmin = {
      email,
      password,
    };

    dispatch(login(createAdmin));
    // resetMessage();
  };

  // Clean all auth states and redirect after 2 seconds if the user is logged in
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

  return (
    <div id="login">
      <h2 id="title">Casa Luz</h2>
      <p id="subtitle">Entre para ter acesso a área de administrador</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Seu email:</span>
          <input
            type="email"
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
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default Login;
