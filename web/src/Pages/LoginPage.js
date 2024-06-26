import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../imagem/Logotipo_Completo.png";
import "../Pages/styles.css";
import { URL } from "../Pages/conf";

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${URL}/more-api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      console.log(responseData);
      localStorage.setItem("id", responseData.id);
      if (!response.ok) {
        throw new Error(responseData.message || "Erro de rede");
      }
      localStorage.setItem("id", responseData.id);
      localStorage.setItem("userName", responseData.Nome);

      if (response.status === 200) {
        if (responseData) {
          history.push("/registros");
        }
      } else {
        alert("Erro: " + responseData.message);
      }
    } catch (error) {
      console.error("Erro do Fetch:", error.message);
    }
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
