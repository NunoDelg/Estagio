const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

require("dotenv").config();

module.exports = (mysqlDB) => {
  // Rota para verificar o token
  router.post("/verify-token/:userId", async (req, res) => {
    const { qr_data } = req.body;
    const { userId } = req.params;

    try {
      console.log("Verificando token no banco de dados:", qr_data);
      const [qr_code] = await mysqlDB
        .promise()
        .query(
          "SELECT * FROM qr_code WHERE qr_data = ? ORDER BY idqr_code DESC LIMIT 1;",
          [qr_data]
        );

      console.log("Resultado da consulta:", qr_code);
      if (!qr_code.length) {
        console.log("Token inválido", token);
        return res.status(404).json({ message: "Token inválido" });
      }

      if (!userId) {
        return res.status(400).json({ message: "ID do usuário não fornecido" });
      }

      await registrarPresenca(qr_data, userId);
      console.log("Token válido. Registrando presença...");
      res.status(200).json({ message: "Token válido" });
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      res.status(500).json({ error: "Erro ao verificar token" });
    }
  });

  // Função para registrar a presença no banco de dados
  const registrarPresenca = async (qr_data, Users_idUsers) => {
    const currentTime = new Date().toISOString();
    try {
      console.log(
        "Registrando presença no banco de dados. QR Data:",
        qr_data,
        "Data e hora:",
        currentTime,
        "User ID:",
        Users_idUsers
      );

      // Verificar se já existe um registro de entrada para o usuário na mesma data
      const [existingEntry] = await mysqlDB
        .promise()
        .query(
          "SELECT * FROM Registos_de_tempo WHERE DATE(Tempo_Entrada) = CURDATE() AND Users_idUsers = ?",
          [parseInt(Users_idUsers)]
        );

      if (existingEntry.length > 0) {
        console.log("id", existingEntry);
        await mysqlDB
          .promise()
          .query(
            "UPDATE Registos_de_tempo SET Saida = ? WHERE idRegistos_de_tempo = ?",
            [currentTime, existingEntry[0].idRegistos_de_tempo]
          );
        console.log("Hora de saída registrada com sucesso");
      } else {
        await mysqlDB
          .promise()
          .query(
            "INSERT INTO Registos_de_tempo (Tempo_Entrada, Nota, Saida, Users_idUsers) VALUES (?, ?, ?, ?)",
            [currentTime, "Entrada", currentTime, parseInt(Users_idUsers)]
          );
        console.log("Presença registrada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao registrar a presença:", error);
      throw new Error("Erro ao registrar a presença");
    }
  };

  // Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("email, password", email, password);
    try {
      const [user] = await mysqlDB
        .promise()
        .query("SELECT * FROM Users WHERE Email = ? ;", [email]);
      console.log(user);
      if (!user.length) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user[0].Password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Registar
  router.post("/register", async (req, res) => {
    const {
      nome,
      apelido,
      email,
      password,
      perfil,
      departamentos_idDepartamentos,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO Users (Nome, Apelido, Email, Password, Perfil, Departamentos_idDepartamentos) VALUES (?, ?, ?, ?, ?, ?)`;

    mysqlDB.query(
      query,
      [
        nome,
        apelido,
        email,
        hashedPassword,
        perfil,
        departamentos_idDepartamentos,
      ],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.status(201).json({ message: "Adicionado com sucesso!" });
        }
      }
    );
  });
  //Rota para gerar o QR code e inserir na BD
  router.post("/gerar-qr-code", async (req, res) => {
    try {
      const token = crypto.randomBytes(16).toString("hex");
      console.log("Token gerado:", token);

      await mysqlDB
        .promise()
        .query("INSERT INTO qr_code (qr_data) VALUES (?)", [String(token)]);
      console.log("Token inserido no banco de dados.");

      res.status(200).send(token);
    } catch (error) {
      console.error("Erro ao gerar QR code:", error);
      res.status(500).send("Erro interno do servidor");
    }
  });

  // actualizar
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const {
      nome,
      apelido,
      password,
      email,
      perfil,
      departamentos_idDepartamentos,
    } = req.body;

    mysqlDB.query(
      "UPDATE Users SET Nome=?, Apelido=?, Password=?, Email=?, Perfil=?, Departamentos_idDepartamentos=? WHERE idUsers=?",
      [
        nome,
        apelido,
        password,
        email,
        perfil,
        departamentos_idDepartamentos,
        id,
      ],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ message: "Perfil atualizado com sucesso!" });
        }
      }
    );
  });
  //eliminar
  router.delete("/:id", (req, res) => {
    const { id } = req.params;

    mysqlDB.query("DELETE FROM Users WHERE idUsers=?", [id], (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Perfil eliminado com sucesso!" });
      }
    });
  });

  return router;
};
