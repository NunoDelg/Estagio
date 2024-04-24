import React, { useState } from "react";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";
import "../Pages/AdicionarContaPage.css";

const AdicionarContaPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleContaClick = () => {
    history.push("/conta");
  };

  const handleLogout = () => {
    history.push("/");
  };
  const handleGenerateQRCode = () => { 
    history.push("/gerar-qrcode");
  };
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
              <button className="menu-option" title="Minha Conta" onClick={handleContaClick}>
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
              <button className="menu-option logout" title="Sair" onClick={handleLogout}>
                <FaSignOutAlt className="menu-icon" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="container">
        <h1>Adicionar Utilizadores</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">N:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Departamento:</label>
            <input type="text" id="department" name="department" required />
          </div>
          <button className="add-button" type="submit">
            <FaUserPlus style={{ marginRight: "5px" }} /> Adicionar Utilizador
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarContaPage;
