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
        credentials: 'include',
      });

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (error) {
        console.error("Erro ao fazer o parse do JSON:", error);
        console.log("Resposta recebida:", responseText);
        throw new Error("Resposta do servidor não é um JSON válido");
      }

      console.log(responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Erro de rede");
      }

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
