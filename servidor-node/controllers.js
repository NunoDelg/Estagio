const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Crie uma conexão com o banco de dados usando as variáveis de ambiente do .env
const mysqlDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

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

// // Função para fazer login
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Busca o usuário no banco de dados pelo email fornecido
//     const user = await mysqlDB.query("SELECT * FROM Users WHERE email = ?", [
//       email,
//     ]);

//     // Se o usuário não existir, retorne um erro de autenticação
//     if (!user || user.length === 0) {
//       return res.status(401).send("Email ou senha incorretos");
//     }

//     // Verifica se a senha fornecida está correta
//     const passwordMatch = await bcrypt.compare(password, user[0].password);

//     // Se a senha estiver incorreta, retorne um erro de autenticação
//     if (!passwordMatch) {
//       return res.status(401).send("Email ou senha incorretos");
//     }

//     // Se a autenticação for bem-sucedida, gere um token de autenticação e retorne para o cliente
//     const token = jwt.sign(
//       {
//         userId: user[0].id,
//         nome: user[0].nome,
//         sobrenome: user[0].sobrenome,
//         perfil: user[0].perfil,
//         departamento_ID: user[0].departamento_ID,
//       },
//       tokenSecret
//     );

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error("Erro durante o login:", error);
//     res.status(500).send("Erro interno do servidor");
//   }
// };

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
const marcarRegistro = async (req, res) => {};

// Rotas para autenticação e manipulação de usuários
app.post("/more-api/users", addUsuario);
// app.post("/more-api/login", login);
app.put("/more-api/users/:Id", editUsuario);
app.delete("/more-api/users/:usuarioId", removeUsuario);
app.post("/more-api/marcar-registro", marcarRegistro);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

module.exports = { addUsuario, editUsuario, removeUsuario, marcarRegistro };
