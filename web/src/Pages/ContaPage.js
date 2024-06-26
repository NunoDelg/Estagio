import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaKey,FaChevronLeft } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/ContaPage.css";

const ContaPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const history = useHistory();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      console.log("No user name found in localStorage.");
    }
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName"); 
    history.push("/");
  };

  const handleGenerateQRCode = () => {
    history.push("/gerar-qrcode");
  };

  const handleChangePassword = () => {
    history.push("/forgot-password");
  };
  const handleGoBack = () => {
    history.goBack("/RegistrosPage");
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
      <div className="go-back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
      </div>
      <div className="container">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <h2>{userName ? userName : "Carregando..."}</h2>{" "}
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
