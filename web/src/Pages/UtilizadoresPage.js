import React, { useState } from "react";
import logo from "../imagem/logohorizontal.png";
import {
  FaEdit,
  FaTrashAlt,
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./UtilizadoresPage.css";

const UtilizadoresPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    console.log("Usuário deletado:", selectedUser);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
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

  const handleEditUser = (usuario) => {
    history.push(`/editar-utilizador/${encodeURIComponent(usuario)}`);
  };

  const departamentos = {
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
      "Leandro Santos",
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
        <div className="image-container">
          <img src={logo} alt="Logo" />
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

      {Object.entries(departamentos).map(([departamento, usuarios]) => (
        <div key={departamento} className="container">
          <h1>{departamento}</h1>
          <div className="button-container">
            <button className="button2" onClick={() => history.push("/adicionar-conta")}>
              <FaUserPlus
                style={{ marginRight: "5px" }}
              />
              Adicionar Conta
            </button>
          </div>
          <div className="user-container">
            {usuarios.map((usuario, index) => (
              <div className="user-container-wrapper" key={index}>
                <div className="user-info">
                  <span>{usuario}</span>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleEditUser(usuario)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteUser(usuario)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Tens a certeza que pretende eliminar? {selectedUser}?</p>
            <div className="modal-buttons">
              <button className="no-button" onClick={handleCancelDelete}>
                Não
              </button>
              <button className="yes-button" onClick={handleConfirmDelete}>
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilizadoresPage;
