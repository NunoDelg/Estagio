import React, { useState } from "react";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";
import "../Pages/EditarUtilizadorPage.css";

const EditarUtilizadorPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: ""
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Dados do formulário de edição enviados:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      <div className="container">
        <h1>Editar Utilizador</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">N:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Departamento:</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
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
