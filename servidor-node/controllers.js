const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  addUsuario,
  editUsuario,
  removeUsuario,
  marcarRegistro,
} = require("./Routes/authRoute");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas para autenticação e manipulação de usuários
app.post("/more-api/users", addUsuario);
app.put("/more-api/users/:Id", editUsuario);
app.delete("/more-api/users/:usuarioId", removeUsuario);
app.post("/more-api/marcar-registro", marcarRegistro);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

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

module.exports = { addUsuario, editUsuario, removeUsuario, marcarRegistro };
