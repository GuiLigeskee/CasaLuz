// CSS
import "./Login.css";

// Components
import { Link, useNavigate } from "react-router-dom";
import Message from "../../Components/Messages/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useResetComponentMessage } from "../../Hooks/useResetComponentMessage";

// Redux
// import { login, reset } from "../../Slices/AuthSlice";
// import { resetMessage } from "../../Slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();

  // const resetMessage = useResetComponentMessage(dispatch);

  // const navigate = useNavigate();

  // const { user, message, loading, error } = useSelector((state) => state.auth);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const user = {
  //     email,
  //     password,
  //   };

  //   dispatch(login(user));
  //   resetMessage();
  // };

  // // Clean all auth states and redirect after 2 seconds if the user is logged in
  // useEffect(() => {
  //   if (user) {
  //     const redirectTimeout = setTimeout(() => {
  //       navigate("/profile");
  //     }, 500);

  //     return () => clearTimeout(redirectTimeout);
  //   }

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, dispatch, navigate]);

  return (
    <div className="login">
      <p className="subtitle">Faça o login para voltar a participar.</p>
      <form>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {/* {!loading && <input type="submit" value="Salvar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />} */}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
