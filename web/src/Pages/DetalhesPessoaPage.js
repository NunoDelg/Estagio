import React, { useState, useEffect } from "react";
import { FaUserCircle, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/DetalhesPessoaPage.css";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

const DetalhesPessoaPage = () => {
  const { nome, departamento } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [horasAleatorias] = useState([
    {
      periodo: 1,
      entrada: 9,
      pausa: 13,
      saida: 18,
      data: new Date(),
    },
    {
      periodo: 2,
      entrada: 14,
      pausa: 16,
      saida: 18,
      data: new Date(),
    },
  ]);
  const [totalHorasPorDia, setTotalHorasPorDia] = useState({});
  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const calcularTotalHorasPorDia = () => {
      const totalHorasDia = {};

      horasAleatorias.forEach((periodo) => {
        const dataFormatada = moment(periodo.data).format("DD/MM/YYYY");

        if (!totalHorasDia[dataFormatada]) {
          totalHorasDia[dataFormatada] = 0;
        }

        totalHorasDia[dataFormatada] +=
          periodo.entrada + periodo.pausa + periodo.saida;
      });

      setTotalHorasPorDia(totalHorasDia);
    };

    calcularTotalHorasPorDia();
  }, [horasAleatorias]);

  const formatarHora = (hora) => {
    return hora < 10 ? `0${hora}:00` : `${hora}:00`;
  };

  const formatarData = (data) => {
    return moment(data).format("DD/MM/YYYY");
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
      <div className="detalhes-container">
        <h2 className="nome-departamento">
          {nome} - {departamento}
        </h2>
        <div className="quadros-container">
          <div className="quadro">
            <table className="table-custom">
              <thead>
                <tr>
                  <th></th>
                  <th colSpan="2">1º Período</th>
                  <th colSpan="3">2º Período</th>
                </tr>
                <tr>
                  <th>Data</th>
                  <th>Entrada</th>
                  <th>Pausa</th>
                  <th>Entrada</th>
                  <th>Pausa</th>
                  <th>Saída</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {horasAleatorias.map((periodo, index) => (
                  <tr key={index}>
                    <td>{formatarData(periodo.data)}</td>
                    <td>{formatarHora(periodo.entrada)}</td>
                    <td>{formatarHora(periodo.pausa)}</td>
                    <td>{formatarHora(periodo.entrada)}</td>
                    <td>{formatarHora(periodo.pausa)}</td>
                    <td>{formatarHora(periodo.saida)}</td>
                    <td>{periodo.entrada + periodo.pausa + periodo.saida}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {Object.entries(totalHorasPorDia).map(([data, totalHoras]) => (
                  <tr key={data}>
                    <td>{data}</td>
                    <td colSpan="5"></td>
                    <td>{totalHoras}</td>
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="footer-text">
              <p>Dias Úteis: 22</p>
              <p>Dias Faltados: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPessoaPage;
