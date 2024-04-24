import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../imagem/Logotipo_Completo.png";
import "../Pages/styles.css";

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    history.push("/registros");
  };

  const handleForgotPassword = () => {
    history.push("/forgot-password");
  };
  return (
    <div className="container">
      <div className="image-container">
        <img src={logo} alt="Logo" />
      </div>
      <h2>Bem-Vindo à MORE CoLAB</h2>
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} className="login-button">
        Entrar
      </button>
      <p>
        <button
          onClick={handleForgotPassword}
          className="forgot-password-button"
        >
          Esqueceu sua senha?
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
