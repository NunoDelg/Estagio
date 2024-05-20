const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlDB = require("mysql2/promise");
const dotenv = require("dotenv");
const connectToDatabase = require("./db");

dotenv.config();

const saltRounds = 10;
const tokenSecret = process.env.TOKEN_SECRET;

// Função para fazer login
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("a fazer login", req.body);

  const mysqlDB = await connectToDatabase();

  try {
    // Busca o usuário no banco de dados pelo email fornecido
    const user = mysqlDB.query("SELECT * FROM Users WHERE email = ?", [email]);

    // Se o usuário não existir, retorne um erro de autenticação
    if (!user || user.length === 0) {
      return res.status(401).send("Email ou senha incorretos");
    }

    // Verifica se a senha fornecida está correta
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Se a senha estiver incorreta, retorne um erro de autenticação
    if (!passwordMatch) {
      return res.status(401).send("Email ou senha incorretos");
    }

    // Se a autenticação for bem-sucedida, gere um token de autenticação e retorne para o cliente
    const token = jwt.sign(
      {
        idUsers: user.idUsers,
        Nome: user.Nome,
        Apelido: user.Apelido,
        PasswordHash: user.PasswordHash,
        Email: user.Email,
        Perfil: user.Perfil,
        TOKEN: user.TOKEN,
        Criado: user.Criado,
        Departamento_idDepartamentos: user.Departamento_idDepartamentos,
      },
      tokenSecret
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

// blindagem dos tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Token de autenticação não fornecido");
  }

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Token de autenticação inválido");
    }
    req.user = user;
    next();
  });
};

// Função para adicionar um novo usuário
const addUsuario = async (req, res) => {
  console.log("vbavabv");
  const {
    Nome,
    Apelido,
    PasswordHash,
    Email,
    Perfil,
    Departamento_idDepartamentos,
  } = req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(PasswordHash, saltRounds);

    // Insere o novo usuário no banco de dados
    await mysqlDB.query(
      "INSERT INTO Users (Nome, Apelido, PasswordHash, Email, Perfil, Departamento_idDepartamentos) VALUES (?, ?, ?, ?, ?, NOW(), ?)",
      [Nome, Apelido, PasswordHash, Email, Perfil, Departamento_idDepartamentos]
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
  const { email, password } = req.body;

  try {
    // Atualiza o usuário no banco de dados
    await mysqlDB.query(
      "UPDATE Users SET email = ?, password = ? WHERE id = ?",
      [email, password, Id]
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
const marcarRegistro = async (req, res) => {};

module.exports = {
  login,
  addUsuario,
  editUsuario,
  removeUsuario,
  marcarRegistro,
  authenticateToken,
};
