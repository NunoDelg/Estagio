const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlDB = require("mysql2/promise");
const dotenv = require("dotenv");
const mysql = require("mysql2");

const mysqlDB2 = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

dotenv.config();

const router = express.Router();
const saltRounds = 10;
const tokenSecret = process.env.TOKEN_SECRET;

// Middleware para verificar o token de autenticação

// Função para fazer login
const login = (req, res) => {
  const { email, password } = req.body;

  console.log("a fazer login", req.body);

  try {
    // Busca o usuário no banco de dados pelo email fornecido
    const user = mysqlDB2.query("SELECT * FROM Users WHERE email = ?", [email]);

    // Se o usuário não existir, retorne um erro de autenticação
    if (!user || user.length === 0) {
      return res.status(401).send("Email ou senha incorretos");
    }

    // Verifica se a senha fornecida está correta
    // const passwordMatch = bcrypt.compare(password, user.password);

    // Se a senha estiver incorreta, retorne um erro de autenticação
    if (password!==user.password) {
      return res.status(401).send("Email ou senha incorretos");
    }

    // // Se a autenticação for bem-sucedida, gere um token de autenticação e retorne para o cliente
    // const token = jwt.sign({
    //   userId: user.id,
    //   nome: user.nome,
    //   sobrenome: user.sobrenome,
    //   perfil: user.perfil,
    //   departamento_ID: user.departamento_ID,
    // });

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

// Função para adicionar um novo usuário
const addUsuario = async (req, res) => {
  const { nome, sobrenome, email, password, perfil, token, departamento_ID } =
    req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insere o novo usuário no banco de dados
    await mysqlDB.query(
      "INSERT INTO Users (nome, sobrenome, email, password, perfil, token, criado, departamento_ID) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)",
      [nome, sobrenome, email, hashedPassword, perfil, token, departamento_ID]
    );

    res.status(201).send("Usuário adicionado com sucesso");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(400).send("Erro ao adicionar usuário");
  }
};

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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Token de autenticação não fornecido");
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(403).send("Token de autenticação inválido");
  }
};

// Rotas protegidas por token de autenticação
router.post("/login", login);
router.post("/users", verifyToken, addUsuario);
router.put("/users/:Id", verifyToken, editUsuario);
router.delete("/users/:usuarioId", verifyToken, removeUsuario);
router.post("/marcar-registro", verifyToken, marcarRegistro);

module.exports = router;
