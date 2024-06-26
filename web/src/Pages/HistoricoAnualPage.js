import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaUserCircle, FaSignOutAlt, FaQrcode } from "react-icons/fa"; 
import { useHistory, useLocation } from "react-router-dom"; 
import axios from "axios";
import logo from "../imagem/logohorizontal.png";
import { URL } from "../Pages/conf";

const HistoricoAnualPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anos, setAnos] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const idUsers = new URLSearchParams(location.search).get("idUsers"); 

  useEffect(() => {
    const fetchAnos = async () => {
      try {
        const response = await axios.get(`${URL}/more-api/users/anos/${encodeURIComponent(idUsers)}`);
        setAnos(response.data);
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
      }
    };

    if (idUsers) {
      fetchAnos();
    }
  }, [idUsers]);

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

  const handleGoBack = () => {
    history.goBack();
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
              <button className="menu-option generate-qr" title="Gerar QR Code" onClick={handleGenerateQRCode}>
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
      <div className="go-back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
      </div>
      <h1>Histórico Anual</h1>
      <div className="anos-container">
        {anos.map((ano, index) => (
          <button
            key={index}
            className={`ano-button ${ano.temRegistros ? 'com-registros' : 'sem-registros'}`}
            disabled={!ano.temRegistros}
            onClick={() => history.push(`/historico-mensal?idUsers=${encodeURIComponent(idUsers)}&ano=${ano.ano}`)}
          >
            {ano.ano}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoricoAnualPage;
