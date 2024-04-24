import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";

const HistoricoPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <div className="container">
      <h1 className="welcome-text">Histórico</h1>
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
      <div className="top-section">
        <div className="month-navigation">
          <FaChevronLeft />
          <span>Março 2024</span>
          <FaChevronRight />
        </div>
        <div className="filters">
          <div className="filter-wrapper">
            <div className="filter-dropdown">
              <select>
                <option value="">Filtrar</option>
              </select>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Pesquisar..." />
            </div>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Estimativas</th>
              <th>Horas Trabalhadas</th>
              <th>Distribuição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João</td>
              <td>45</td>
              <td>40</td>
              <td>
                <table className="sub-table">
                  <tbody>
                    <tr>
                      <td>50%</td>
                      <td>25%</td>
                      <td>25%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Maria</td>
              <td>50</td>
              <td>35</td>
              <td>
                <table className="sub-table">
                  <tbody>
                    <tr>
                      <td>70%</td>
                      <td>20%</td>
                      <td>10%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Carlos</td>
              <td>60</td>
              <td>55</td>
              <td>
                <table className="sub-table">
                  <tbody>
                    <tr>
                      <td>45%</td>
                      <td>30%</td>
                      <td>25%</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricoPage;
