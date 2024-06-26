import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../imagem/logohorizontal.png";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaUserFriends, FaChevronLeft } from "react-icons/fa";
import "../Pages/styles.css";

const RegistoAgrupado = () => {
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

  const handleGoBack = () => {
    history.goBack("/RegistrosPage");
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
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="go-back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
      </div>
      <h2 className="welcome-text" style={{ textAlign: "left" }}>
        Aqui estão os registros agrupados dos Departamentos:
      </h2>
      <div className="flex-container">
        <div className="rectangle-grid">
          <Link to="/detalhe-equipe-agrupado/DO" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">DO</span>
          </Link>
          <Link to="/detalhe-equipe-agrupado/BIOB" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">BIOB</span>
          </Link>
          <Link to="/detalhe-equipe-agrupado/ECO" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">ECO</span>
          </Link>
          <Link to="/detalhe-equipe-agrupado/PVC" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">PVC</span>
          </Link>
          <Link to="/detalhe-equipe-agrupado/PTB" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">PTB</span>
          </Link>
          <Link to="/detalhe-equipe-agrupado/TECH" className="rectangle">
            <FaUserFriends className="icon" /> <span className="text">TECH</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistoAgrupado;
