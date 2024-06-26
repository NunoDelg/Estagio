import React, { useState, useEffect, useCallback } from "react";
import {
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import logo from "../imagem/logohorizontal.png";
import "../Pages/DetalhesPessoaPage.css";
import moment from "moment";
import "moment/locale/pt";
import { URL } from "../Pages/conf";



moment.locale("pt");

const DetalhesPessoaPage = () => {
  const { nome, departamento } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [registos, setRegistos] = useState([]);
  const [totalHorasPorDia, setTotalHorasPorDia] = useState({});
  const [registosPorMes, setRegistosPorMes] = useState({});
  const [currentMonth, setCurrentMonth] = useState(moment());
  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleGoBack = () => {
    history.goBack("/DetalhesEquipePage");
  };

  const organizarRegistosPorMes = useCallback((registos) => {
    const registosMes = {};

    registos.forEach((registo) => {
      const mes = moment(registo.Entrada1).format("MMMM YYYY");
      if (!registosMes[mes]) {
        registosMes[mes] = [];
      }
      registosMes[mes].push(registo);
    });

    setRegistosPorMes(registosMes);
    calcularTotalHorasPorDia(registosMes);
  }, []);

  const calcularTotalHorasPorDia = (registosMes) => {
    const totalHorasDia = {};

    Object.keys(registosMes).forEach((mes) => {
      registosMes[mes].forEach((registo) => {
        const dataFormatada = moment(registo.Entrada1).format("DD/MM/YYYY");

        if (!totalHorasDia[dataFormatada]) {
          totalHorasDia[dataFormatada] = 0;
        }

        const entrada1 = moment(registo.Entrada1);
        const saida1 = moment(registo.Saida1);
        const entrada2 = moment(registo.Entrada2);
        const saida2 = moment(registo.Saida2);

        const DURACAO_ALMOCO = moment.duration(1, "hours");

        const horasTrabalhadas1 =
          saida1.diff(entrada1, "hours", true) - DURACAO_ALMOCO.asHours();
        const horasTrabalhadas2 =
          saida2.diff(entrada2, "hours", true) - DURACAO_ALMOCO.asHours();

        const totalHorasTrabalhadasDia = horasTrabalhadas1 + horasTrabalhadas2;

        totalHorasDia[dataFormatada] += totalHorasTrabalhadasDia;
      });
    });

    setTotalHorasPorDia(totalHorasDia);
  };

  useEffect(() => {
    const fetchRegistos = async () => {
      try {
        const response = await fetch(
          `${URL}/more-api/users/registos/${encodeURIComponent(nome)}`
        );
        const data = await response.json();

        if (response.ok) {
          console.log("Registos recebidos:", data);
          setRegistos(data);
        } else {
          console.error("Erro ao buscar registos:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar registos:", error);
      }
    };

    fetchRegistos();
  }, [nome]);

  useEffect(() => {
    organizarRegistosPorMes(registos);
  }, [registos, currentMonth, organizarRegistosPorMes]);

  const formatarHora = (hora) => {
    return moment(hora).format("HH:mm");
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

  const calcularDiasUteisEFaltados = (mes) => {
    const totalDias = moment(mes, "MMMM YYYY").daysInMonth();
    let diasUteis = 0;
    let diasFaltados = 0;

    for (let i = 1; i <= totalDias; i++) {
      const data = moment(`${i} ${mes}`, "D MMMM YYYY");
      if (data.isoWeekday() <= 5) {
        diasUteis++;
        if (!totalHorasPorDia[data.format("DD/MM/YYYY")]) {
          diasFaltados++;
        }
      }
    }

    return { diasUteis, diasFaltados };
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "month"));
  };

  const gerarDiasDoMes = (mes) => {
    const diasNoMes = [];
    const totalDias = mes.daysInMonth();

    for (let i = 1; i <= totalDias; i++) {
      const data = moment(mes).date(i);
      diasNoMes.push(data);
    }

    return diasNoMes;
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
      <div className="detalhes-container">
        <h2 className="nome-departamento">
          {nome} - {departamento}
        </h2>
        <div className="month-navigation">
          <button className="month-nav-button" onClick={handlePreviousMonth}>
            <FaChevronLeft />
          </button>
          <h3>
            <span>{currentMonth.format("MMMM YYYY")}</span>
          </h3>
          <button className="month-nav-button" onClick={handleNextMonth}>
            <FaChevronRight />
          </button>
        </div>
        <div className="quadros-container">
          {Object.entries(registosPorMes).map(([mes, registosMes]) => {
            if (mes !== currentMonth.format("MMMM YYYY")) {
              return null;
            }

            const { diasUteis, diasFaltados } = calcularDiasUteisEFaltados(mes);

            const diasDoMes = gerarDiasDoMes(currentMonth);
            const registosMap = registosMes.reduce((acc, registo) => {
              const data = moment(registo.Entrada1).format("DD/MM/YYYY");
              acc[data] = registo;
              return acc;
            }, {});

            return (
              <div className="quadro" key={mes}>
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th colSpan="2">Manhã</th>
                      <th colSpan="2">Tarde</th>
                      <th>Total</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>Entrada</th>
                      <th>Saída</th>
                      <th>Entrada</th>
                      <th>Saída</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {diasDoMes.map((data) => {
                      const dataFormatada = data.format("DD/MM/YYYY");
                      const registo = registosMap[dataFormatada] || {};

                      const entrada1 = registo.Entrada1
                        ? formatarHora(registo.Entrada1)
                        : "";
                      const saida1 = registo.Saida1
                        ? formatarHora(registo.Saida1)
                        : "";
                      const entrada2 = registo.Entrada2
                        ? formatarHora(registo.Entrada2)
                        : "";
                      const saida2 = registo.Saida2
                        ? formatarHora(registo.Saida2)
                        : "";

                      const totalHoras =
                        entrada1 && saida1 && entrada2 && saida2
                          ? (
                              moment(registo.Saida1).diff(
                                moment(registo.Entrada1),
                                "hours",
                                true
                              ) +
                              moment(registo.Saida2).diff(
                                moment(registo.Entrada2),
                                "hours",
                                true
                              )
                            ).toFixed(2)
                          : "0.00";

                      const isWeekend = data.isoWeekday() > 5;
                      const rowClass = isWeekend ? "weekend" : "";

                      return (
                        <tr key={dataFormatada} className={rowClass}>
                          <td>{data.format("DD")}</td>
                          <td>{entrada1}</td>
                          <td>{saida1}</td>
                          <td>{entrada2}</td>
                          <td>{saida2}</td>
                          <td>{totalHoras}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="footer-text">
                  <p>Dias Úteis: {diasUteis}</p>
                  <p>Dias Faltados: {diasFaltados}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetalhesPessoaPage;
