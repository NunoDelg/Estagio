import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa"; 
import logo from "../imagem/logohorizontal.png";
import logo1 from "../imagem/Logotipo_Completo.png";
import "./ForgotPasswordPage.css"; 

const ForgotPasswordPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState(""); 
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const history = useHistory();

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Enviar código para:", email);
    setShowCodeModal(true);
  };

  const handleCodeSubmit = () => {
    console.log("Código de verificação:", verificationCode);
    history.push("/create-new-password");
  };

  return (
    <div className="forgot-password-container">
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
      <h2 className="centered">Esqueceu sua senha?</h2>
      <div className="forgot-password-form">
        <input
          type="email"
          placeholder="Insira seu email"
          value={email}
          onChange={handleEmailChange}
        />
        <button className="send-code-button" onClick={handleSubmit}>
          Enviar Código
        </button>
      </div>

      {showCodeModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Insira o código de verificação</h2>
            <input
              type="text"
              placeholder="Código de verificação"
              value={verificationCode}
              onChange={handleCodeChange}
            />
            <button className="submit-button" onClick={handleCodeSubmit}>
              Confirmar Código
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
