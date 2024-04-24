import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/ContaPage.css";

const ContaPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    history.push("/");
  };
  const handleGenerateQRCode = () => { 
    history.push("/gerar-qrcode");
  };


  const handleChangePassword = () => {};

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="image-container">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="navbar-right">
          <button className="menu-icon" onClick={handleMenuClick}>
            <span>☰</span>
          </button>
          {menuOpen && (
            <div className="menu-options">
              <button className="menu-option" title="Minha Conta">
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
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="container">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <h2>Nome do Usuário</h2>
        </div>
        <div className="buttons-container">
          <button
            className="change-password-button"
            onClick={handleChangePassword}
          >
            <FaKey className="change-password-icon" />
            <span>Alterar Senha</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContaPage;
