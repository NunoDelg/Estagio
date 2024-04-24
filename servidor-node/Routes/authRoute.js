const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Crie uma conexão com o banco de dados usando as variáveis de ambiente do .env
const mysqlDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const router = express.Router();

router.use(cors());

// Função para adicionar um novo usuário
const addUsuario = async (req, res) => {
  const { nome, sobrenome, email, password, perfil, token, departamento_ID } =
    req.body;
  try {
    // Insere o novo usuário no banco de dados
    await mysqlDB.query(
      "INSERT INTO Users (nome, sobrenome, email, password, perfil, token, criado, departamento_ID) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)",
      [nome, sobrenome, email, password, perfil, token, departamento_ID]
    );
    res.status(201).send("Usuário adicionado com sucesso");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(400).send("Erro ao adicionar usuário");
  }
};
// Rota para login
router.post("/auth/login", (req, res) => {
  console.log("Tentativa de login:", req.body); 

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Dados inválidos:", req.body);
    res.status(400).send("E-mail e senha são obrigatórios");
    return;
  }

  const sql = "SELECT * FROM Users WHERE Email = ? AND Password = ?";
  mysqlDB.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).send("Erro ao fazer login");
      return;
    }

    console.log("Resultado da consulta:", result); 

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login bem-sucedido",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "E-mail ou senha incorretos",
      });
    }
  });
});

// Função para editar um usuário existente
const editUsuario = async (req, res) => {
  const { Id } = req.params;
  const { email, password, token } = req.body;

  try {
    // Atualiza o usuário no banco de dados
    await mysqlDB.query(
      "UPDATE Users SET email = ?, password = ?, token = ? WHERE id = ?",
      [email, password, token, Id]
    );
    res.status(200).send("Usuário atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(400).send("Erro ao atualizar usuário");
  }
};

// Função para remover um usuário
const removeUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    // Remove o usuário do banco de dados
    await mysqlDB.query("DELETE FROM Users WHERE id = ?", [usuarioId]);
    res.status(200).send("Usuário removido com sucesso");
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    res.status(400).send("Erro ao remover usuário");
  }
};

// Função para marcar um registro
const marcarRegistro = async (req, res) => {
  // Implemente a lógica para marcar um registro aqui, conforme necessário
};

// Rotas
router.post("/users", addUsuario);
router.put("/users/:Id", editUsuario);
router.delete("/users/:usuarioId", removeUsuario);
router.post("/marcar-registro", marcarRegistro);

module.exports = router;
