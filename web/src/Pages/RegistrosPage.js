import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaHistory,
  FaUsers,
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";

const RegistrosPage = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    history.push("/");
  };

  const handleHistoryClick = () => {
    history.push("/registo-agrupado");
  };

  const handleUsersClick = () => {
    history.push("/utilizadores");
  };

  const handleRecordsClick = () => {
    history.push("/registos-equipas");
  };

  const handleContaClick = () => {
    history.push("/conta");
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
      <h2 className="welcome-text">Bem-Vindo</h2>
      <p>{dateTime.toLocaleString()}</p>
      <h3>Registo de Ponto</h3>
      <div className="rectangle-container">
        <button className="rectangle" onClick={handleHistoryClick}>
          <FaHistory className="icon" />
          <span>Histórico</span>
        </button>
        <button className="rectangle" onClick={handleUsersClick}>
          <FaUsers className="icon" />
          <span>Utilizadores</span>
        </button>
        <button className="rectangle" onClick={handleRecordsClick}>
          <FaClipboardList className="icon" />
          <span>Registos</span>
        </button>
      </div>
    </div>
  );
};

export default RegistrosPage;