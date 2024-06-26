import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import logo from "../imagem/logohorizontal.png";
import logo1 from "../imagem/Logotipo_Completo.png";
import "./CreateNewPasswordPage.css";

const CreateNewPasswordPage = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const handleNovaSenhaChange = (e) => {
    setNovaSenha(e.target.value);
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleContaClick = () => {
    history.push("/conta");
  };

  const handleGenerateQRCode = () => {
    history.push("/gerar-qrcode");
  };

  const handleLogout = () => {
    history.push("/");
  };

  const handleSubmit = async () => {
    try {
      if (novaSenha === confirmarSenha) {
        await axios.post("/reset-password", { novaSenha });
        alert("Senha alterada com sucesso!");
        history.push("/");
      } else {
        alert("As senhas não coincidem. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="image-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-right">
          <button className="menu-icon" onClick={handleMenuClick}>
            <span>☰</span>
          </button>
          {menuOpen && (
            <div className="menu-options">
              <button
                className="menu-option"
                title="Minha Conta"
                onClick={handleContaClick}
              >
                <FaUserCircle className="menu-icon" />
                <span>Conta</span>
              </button>
              <button
                className="menu-option generate-qr"
                title="Gerar QR Code"
                onClick={handleGenerateQRCode}
              >
                <FaQrcode className="menu-icon" />
                <span>Gerar QR Code</span>
              </button>
              <button
                className="menu-option logout"
                title="Sair"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="menu-icon" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="image-container centered">
        <img src={logo1} alt="Logo1" />
      </div>
      <h2 className="centered">Criar Nova Senha</h2>
      <div className="create-new-password-form">
        <input
          type="password"
          placeholder="Nova Senha"
          value={novaSenha}
          onChange={handleNovaSenhaChange}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={handleConfirmarSenhaChange}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Confirmar Senha
        </button>
      </div>
    </div>
  );
};

export default CreateNewPasswordPage;
