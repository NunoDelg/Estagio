import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaChevronLeft,
  FaUserPlus,
} from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";
import "../Pages/AdicionarContaPage.css";
import { URL } from "../Pages/conf.js";

const AdicionarContaPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    apelido: "",
    email: "",
    password: "",
    perfil: "",
    departamentos_idDepartamentos: "",
  });

  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    history.goBack("/UtilizadoresPage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando dados:", formData);
      const response = await fetch(`${URL}/more-api/users/registar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Usuário adicionado com sucesso!");
      } else {
        alert(data.message || "Erro ao adicionar usuário.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao adicionar usuário.");
    }
  };

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch(`${URL}/more-api/users/departamentos`);
        const data = await response.json();
        if (response.ok) {
          setDepartamentos(data);
        } else {
          console.error("Erro ao buscar departamentos:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, []);

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
      <div className="container">
        <h1>Adicionar Utilizadores</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apelido">Apelido:</label>
            <input
              type="text"
              id="apelido"
              name="apelido"
              value={formData.apelido}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="perfil">Perfil:</label>
            <input
              type="text"
              id="perfil"
              name="perfil"
              value={formData.perfil}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="departamentos_idDepartamentos">Departamento:</label>
            <select
              id="departamentos_idDepartamentos"
              name="departamentos_idDepartamentos"
              value={formData.departamentos_idDepartamentos}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o Departamento</option>
              {departamentos.map((departamento) => (
                <option
                  key={departamento.idDepartamentos}
                  value={departamento.idDepartamentos}
                >
                  {departamento.Nome_Departamento}
                </option>
              ))}
            </select>
          </div>
          <button className="add-button" type="submit">
            <FaUserPlus style={{ marginRight: "5px" }} /> Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdicionarContaPage;
