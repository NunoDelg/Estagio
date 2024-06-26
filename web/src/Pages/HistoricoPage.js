import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../Pages/conf";

const HistoricoPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registos, setRegistos] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const idUsers = params.get("idUsers");
  const ano = parseInt(params.get("ano"));
  const mes = parseInt(params.get("mes"));

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
    history.goBack("/RegistosPage");
  };

  const fetchRegistos = useCallback(async (ano, mes) => {
    if (!idUsers || isNaN(idUsers)) {
      console.error("idUsers inválido:", idUsers);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/more-api/users/registos-agrupados/${encodeURIComponent(idUsers)}`);
      const registrosFromServer = response.data;

      const registrosFiltrados = registrosFromServer.filter(
        registo => registo.Ano === ano && registo.Mes === mes
      );

      setRegistos(registrosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar registos:", error);
    } finally {
      setLoading(false);
    }
  }, [idUsers]);

  useEffect(() => {
    fetchRegistos(ano, mes);
  }, [fetchRegistos, ano, mes]);

  const formatMonthYear = (year, month) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(ano, mes);

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
      <div className="go-back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
      </div>
      <div className="month-year">
        <h2>{formatMonthYear(ano, mes)}</h2>
      </div>
      <div className="table-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Total Registos</th>
                <th>Horas Trabalhadas</th>
                <th>Entrada</th>
                <th>Saída</th> 
                <th>Entrada</th>
                <th>Saída</th>
              </tr>
            </thead>
            <tbody>
              {daysInMonth.map((day) => {
                const dayRegistos = registos.filter(r => {
                  const dayDetails = r.RegistosDetalhados.split(';').map(d => new Date(d.split(',')[0]).getDate());
                  return dayDetails.includes(day.getDate());
                });
                
                const registoDetalhes = dayRegistos.flatMap(r => r.RegistosDetalhados.split(';').filter(d => new Date(d.split(',')[0]).getDate() === day.getDate()));

                if (registoDetalhes.length === 0) {
                  return (
                    <tr key={day}>
                      <td>{day.getDate()}</td>
                      <td>0</td>
                      <td>0.00</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  );
                } else {
                  return registoDetalhes.map((detalhe, index) => {
                    const [Entrada1, Saida1, Entrada2, Saida2] = detalhe.split(',');
                    return (
                      <tr key={`${day}-${index}`}>
                        <td>{day.getDate()}</td>
                        <td>{dayRegistos.length}</td>
                        <td>{parseFloat(dayRegistos.reduce((acc, reg) => acc + parseFloat(reg.HorasTrabalhadas), 0)).toFixed(2)}</td>
                        <td>{Entrada1 || "N/A"}</td>
                        <td>{Saida1 || "N/A"}</td>
                        <td>{Entrada2 || "N/A"}</td>
                        <td>{Saida2 || "N/A"}</td>
                      </tr>
                    );
                  });
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoricoPage;
