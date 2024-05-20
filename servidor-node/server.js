const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

dotenv.config();

const app = express();
const port = 3000;

const mysqlDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  insecureAuth: true,
});

// Configurando o CORS
const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Parsear requisições do tipo application/json
app.use(bodyParser.json());

// Parsear requisições do tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para Users
const userRoutes = require("./Routes/userRoutes");
app.use("/more-api/users", userRoutes(mysqlDB));

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erro interno do servidor");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
