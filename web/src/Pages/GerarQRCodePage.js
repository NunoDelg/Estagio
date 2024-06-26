import React, { useState } from "react";
import {
  FaQrcode,
  FaEye,
  FaPrint,
  FaArrowLeft,
  FaArrowDown,
  FaFilePdf,
  FaUserCircle,
  FaChevronLeft,
  FaSignOutAlt,
} from "react-icons/fa";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import { URL } from "./conf";
import logo from "../imagem/logohorizontal.png";
import { useHistory } from "react-router-dom";
import "./GerarQRCodePage.css";

Modal.setAppElement("#root");

const GerarQRCodePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrData, setQrData] = useState("");
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGenerateQRCode = async () => {
    console.log("Gerando QR Code...");
    try {
      const response = await fetch(`${URL}/more-api/users/gerar-qr-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao gerar QR code");
      }
      const token = await response.text();
      console.log("Token gerado:", token);
      setQrData(token);
      setIsModalOpen(true);
      history.push("/gerar-qrcode");
    } catch (error) {
      console.error("Erro ao gerar QR code:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleContaClick = () => {
    history.push("/conta");
  };

  const handleLogout = () => {
    history.push("/");
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleVoltar = () => {
    setIsModalOpen(false);
  };
  const handleGoBack = () => {
    history.goBack("/RegistrosPage");
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
      <div className="content">
        <button className="generate-button" onClick={handleGenerateQRCode}>
          <FaQrcode className="button-icon" />
          <span>Gerar QR Code</span>
        </button>
        <div className="button-container">
          <button className="action-button">
            <FaEye className="button-icon" />
            <span>Mostrar</span>
          </button>
          <button className="action-button">
            <FaPrint className="button-icon" />
            <span>Imprimir</span>
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
            },
          }}
        >
          <div className="qr-code">
            <QRCode value={qrData} size={256} />
          </div>
          <div className="download-buttons">
            <button className="download-button">
              <FaArrowDown className="button-icon" />
              Download JPEG
            </button>
            <button className="download-button">
              <FaFilePdf className="button-icon" />
              Download PDF
            </button>
          </div>
          <button className="voltar-button" onClick={handleVoltar}>
            <FaArrowLeft className="button-icon" />
            Fechar
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default GerarQRCodePage;
