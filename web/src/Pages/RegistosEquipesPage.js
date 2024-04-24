import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../imagem/logohorizontal.png";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import "../Pages/styles.css";

const RegistosEquipesPage = () => {
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
    <div className="container">
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
      <h2 className="welcome-text" style={{ textAlign: "left" }}>
        Aqui estão os registros dos Departamentos:
      </h2>
      <div className="flex-container">
        <div className="rectangle-grid">
          <Link to="/detalhes-equipe/DO" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">DO</span>
          </Link>
          <Link to="/detalhes-equipe/BIOB" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">BIOB</span>
          </Link>
          <Link to="/detalhes-equipe/ECO" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">ECO</span>
          </Link>
          <Link to="/detalhes-equipe/PVC" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">PVC</span>
          </Link>
          <Link to="/detalhes-equipe/PTB" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">PTB</span>
          </Link>
          <Link to="/detalhes-equipe/TECH" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">TECH</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistosEquipesPage;
