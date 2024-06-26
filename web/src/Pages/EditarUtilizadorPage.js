import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaUserEdit,
  FaChevronLeft,
} from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/EditarUtilizadorPage.css";
import { URL } from "../Pages/conf";

const EditarUtilizadorPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    apelido: "",
    password: "",
    email: "",
    perfil: "",
    departamentos_idDepartamentos: "",
  });
  const [departamentos, setDepartamentos] = useState([]);
  const history = useHistory();
  const id = history.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${URL}/more-api/users/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            nome: data.Nome,
            apelido: data.Apelido,
            password: "",
            email: data.Email,
            perfil: data.Perfil,
            departamentos_idDepartamentos: data.Departamentos_idDepartamentos,
          });
        } else {
          console.error("Erro ao buscar dados do usuário:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [id]);

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

  const handleGoBack = () => {
    history.goBack("/RegistrosPage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ID:", id);

    const {
      nome,
      apelido,
      password,
      email,
      perfil,
      departamentos_idDepartamentos,
    } = formData;

    try {
      const response = await fetch(`${URL}/more-api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          apelido,
          password,
          email,
          perfil,
          departamentos_idDepartamentos,
        }),
      });

      if (response.ok) {
        console.log("Perfil atualizado com sucesso!");
        history.push("/utilizadores");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar usuário:", errorData.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <div className="container">
        <h1>Editar Utilizador</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="departamentos_idDepartamentos">Departamento:</label>
            <select
              id="departamentos_idDepartamentos"
              name="departamentos_idDepartamentos"
              value={formData.departamentos_idDepartamentos}
              onChange={handleChange}
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
          <button className="edit-button" type="submit">
            <FaUserEdit style={{ marginRight: "5px" }} /> Editar Utilizador
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarUtilizadorPage;
