const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoute = require("./Routes/authRoute");

dotenv.config();

const app = express();
const port = 3000;

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

// Rota para autenticação
app.use("/more-api", authRoute);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erro interno do servidor");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
