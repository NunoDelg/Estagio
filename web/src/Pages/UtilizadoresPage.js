import React, { useState, useEffect } from "react";
import logo from "../imagem/logohorizontal.png";
import {
  FaEdit,
  FaTrashAlt,
  FaUserCircle,
  FaQrcode,
  FaSignOutAlt,
  FaChevronLeft,
  FaUserPlus,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./UtilizadoresPage.css";
import { URL } from "../Pages/conf";

const UtilizadoresPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${URL}/more-api/users/usuarios`);
        const data = await response.json();
        console.log("Response data:", data);
        if (response.ok) {
          setUsuarios(data);
        } else {
          console.error("Erro ao buscar usuários:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${URL}/more-api/users/${selectedUser.idUsers}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Usuário deletado com sucesso:", data);
        setUsuarios(usuarios.filter(user => user.idUsers !== selectedUser.idUsers));
        setShowModal(false);
      } else {
        console.error("Erro ao deletar usuário:", data.message);
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
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
  const handleGoBack = () => {
    history.goBack("/RegistrosPage");
  };

  const handleEditUser = (usuario) => {
    console.log("editar", usuario);
    history.push(`/editar-utilizador/${encodeURIComponent(usuario)}`);
  };

  const usuariosPorDepartamento = usuarios.reduce((acc, curr) => {
    if (!acc[curr.Nome_Departamento]) {
      acc[curr.Nome_Departamento] = [];
    }
    acc[curr.Nome_Departamento].push(curr);
    return acc;
  }, {});

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
      <div className="go-back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          <FaChevronLeft />
        </button>
      </div>    
      {Object.entries(usuariosPorDepartamento).map(
        ([departamento, usuarios]) => (
          <div key={departamento} className="container">
            <h1>{departamento}</h1>
            <div className="button-container">
              <button
                className="button2"
                onClick={() => history.push("/adicionar-conta")}
              >
                <FaUserPlus style={{ marginRight: "5px" }} />
                Adicionar Conta
              </button>
            </div>
            <div className="user-container">
              {usuarios.map((user, index) => (
                <div className="user-container-wrapper" key={index}>
                  <div className="user-info">
                    <span>{user.Nome}</span>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => handleEditUser(user.idUsers)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteUser(user)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Tens a certeza que pretende eliminar? {selectedUser?.Nome}?</p>
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
