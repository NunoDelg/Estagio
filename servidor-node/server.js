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
  origin: "http://192.168.0.149",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

// Aplicando as configurações do CORS
app.use(cors(corsOptions));

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
