import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { URL } from "../Pages/conf";
import "./HistoricoMensalPage.css"; // Importing the CSS file

const HistoricoMensalPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [meses, setMeses] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const idUsers = params.get("idUsers");
  const ano = params.get("ano");

  useEffect(() => {
    const fetchMeses = async () => {
      try {
        const response = await axios.get(`${URL}/more-api/users/meses/${ano}`);
        setMeses(response.data);
      } catch (error) {
        console.error("Erro ao buscar meses:", error);
      }
    };

    if (ano) {
      fetchMeses();
    }
  }, [ano]);

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

  const handleMesClick = (mes) => {
    history.push(`/historico?idUsers=${encodeURIComponent(idUsers)}&ano=${ano}&mes=${mes}`);
  };

  const todosMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="historico-mensal-container">
      <h1 className="welcome-text">Histórico Mensal</h1>
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
      <div className="meses-container">
        {todosMeses.map((mesNome, index) => {
          const mesIndex = index + 1;
          const mes = meses.find(m => m.Mes === mesIndex);
          const temRegistros = mes ? mes.temRegistros : false;
          return (
            <button
              key={mesIndex}
              className={`mes-button ${temRegistros ? 'com-registros' : 'sem-registros'}`}
              onClick={() => temRegistros && handleMesClick(mesIndex)}
              title={temRegistros ? "" : "Nenhum registro encontrado"}
              disabled={!temRegistros}
            >
              {mesNome}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HistoricoMensalPage;
