import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaAngleDown,
} from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/DetalhesEquipePage.css";

const DetalhesEquipePage = () => {
  const { departamento } = useParams();
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

  const nomes = {
    DO: [
      "Ana Luísa Machado",
      "Cátia Vale",
      "Vanessa Afonso",
      "Sofia Nunes",
      "Luciana Cabeceiro Silva",
      "Ana Oliveira",
      "Inês Campello",
      "Alberto Teixeira",
    ],
    BIOB: [
      "Ermelinda Silva",
      "Luís Rocha",
      "Natércia Fernandes",
      "Luana Fernandes",
      "João Pinto",
      "Ana Paula Pereira",
      "Alexandre Gonçalves",
    ],
    ECO: [
      "Carolina Campos",
      "Susana Araújo",
      "José Filho",
      "Sara Rodrigues",
      "Silvana Costa",
      "Daniel de Figueiredo",
      "Tânia Marques",
    ],
    PTB: ["Carolina Carvalho", "Patrícia Cordeiro"],
    TECH: [
      "Nuno Delgado",
      "Ricardo Freitas",
      "Khadija Sabiri",
      "Estefânia Gonçalves",
      "Tiago Franca",
      "Gustavo Vieira",
      "Elisabete Freitas",
      "Gonçalo Silva",
      "Caio Camargo",
      "Rui Fernandes",
      "Higor Rosse",
      "Leandro Santos"
    ],
    PVC: [
      "Maria Seixas",
      "Bárbara Matias",
      "Natacha Pinto",
      "José Francisco",
      "Luís Silva",
    ],
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
      <h1>{departamento}</h1>
      <div className="nomes-container">
        {nomes[departamento].map((nome, index) => (
          <div key={index} className="nome">
            <span>{nome}</span>
            <Link to={`/detalhes/${encodeURIComponent(nome)}/${departamento}`} className="ver-mais">
              Ver Mais <FaAngleDown />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalhesEquipePage;