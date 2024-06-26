import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FaUserCircle, FaQrcode, FaSignOutAlt, FaAngleDown, FaChevronLeft } from "react-icons/fa";
import logo from "../imagem/logohorizontal.png";
import "../Pages/DetalhesEquipePage.css";
import { URL } from "../Pages/conf";

const DetalheEquipeAgrupado = () => {
  const { departamento } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${URL}/more-api/users/usuarios`);
        const data = await response.json();
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
    history.goBack("/RegistosEquipesPage");
  };

  const usuariosPorDepartamento = usuarios.filter(
    (user) => user.Nome_Departamento === departamento
  );

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
      <h1>{departamento}</h1>
      <div className="nomes-container">
        {usuariosPorDepartamento.map((user, index) => {
          console.log("User historico:", user.idUsers);
          return (
            <div key={index} className="nome">
              <span>{user.Nome}</span>
              <Link
                to={`/historico-anual?idUsers=${encodeURIComponent(user.idUsers)}`}
                className="ver-mais"
              >
                Historico <FaAngleDown />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetalheEquipeAgrupado;
