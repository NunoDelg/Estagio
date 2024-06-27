const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const moment = require("moment");

require("dotenv").config();

module.exports = (mysqlDB) => {
  // Rota para verificar o token
  router.post("/verify-token/:idUsers", async (req, res) => {
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
  // Função para registar a presença no banco de dados
  const registrarPresenca = async (qr_data, Users_idUsers) => {
    try {
      const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(
        "Registando presença no banco de dados. QR Data:",
        qr_data,
        "Data e hora:",
        currentTime,
        "User ID:",
        Users_idUsers
      );

      const userId = parseInt(Users_idUsers);

      // Verificar se já existe um registo de entrada para o usuário na mesma data
      const [existingEntry] = await mysqlDB
        .promise()
        .query(
          "SELECT * FROM Registos_de_tempo WHERE DATE(Entrada1) = CURDATE() AND Users_idUsers = ?",
          [userId]
        );

      if (existingEntry.length > 0) {
        console.log("id", existingEntry);
        // Verificar qual campo de saída está vazio para atualizar o respectivo campo
        if (!existingEntry[0].Saida1) {
          await mysqlDB
            .promise()
            .query(
              "UPDATE Registos_de_tempo SET Saida1 = ? WHERE idRegistos_de_tempo = ?",
              [currentTime, existingEntry[0].idRegistos_de_tempo]
            );
          console.log("Hora de saída 1 registada com sucesso");
        } else if (!existingEntry[0].Entrada2) {
          await mysqlDB
            .promise()
            .query(
              "UPDATE Registos_de_tempo SET Entrada2 = ? WHERE idRegistos_de_tempo = ?",
              [currentTime, existingEntry[0].idRegistos_de_tempo]
            );
          console.log("Hora de entrada 2 registrada com sucesso");
        } else if (!existingEntry[0].Saida2) {
          await mysqlDB
            .promise()
            .query(
              "UPDATE Registos_de_tempo SET Saida2 = ? WHERE idRegistos_de_tempo = ?",
              [currentTime, existingEntry[0].idRegistos_de_tempo]
            );
          console.log("Hora de saída 2 registada com sucesso");
        } else {
          console.log("Ambos os campos de saída estão preenchidos");
        }
      } else {
        // Se não existe uma entrada para o dia atual, insira uma nova entrada
        await mysqlDB
          .promise()
          .query(
            "INSERT INTO Registos_de_tempo (Entrada1, Users_idUsers) VALUES (?, ?)",
            [currentTime, userId]
          );
        console.log("Presença registada com sucesso");
      }
    } catch (error) {
      console.error("Erro ao registar a presença:", error);
      throw new Error("Erro ao registar a presença");
    }
  };
  // Rota para buscar registros de tempo de um usuário específico
  router.get("/registos/:idUsers", async (req, res) => {
    const { idUsers } = req.params;
    try {
      const query = "SELECT * FROM Registos_de_tempo WHERE Users_idUsers = ?";
      const [rows] = await mysqlDB.promise().query(query, [parseInt(idUsers)]);

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Registos não encontrados para este usuário" });
      }

      res.json(rows);
    } catch (error) {
      console.error("Erro ao buscar registos de tempo:", error);
      res.status(500).json({ message: "Erro ao buscar registos de tempo" });
    }
  });
  // Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const [user] = await mysqlDB
        .promise()
        .query("SELECT * FROM Users WHERE Email = ? ;", [email]);
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
  router.post("/registar", async (req, res) => {
    const {
      nome,
      apelido,
      email,
      password,
      perfil,
      departamentos_idDepartamentos,
    } = req.body;

    if (
      !nome ||
      !apelido ||
      !email ||
      !password ||
      !perfil ||
      !departamentos_idDepartamentos
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    try {
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
            res
              .status(201)
              .json({ message: "Usuário adicionado com sucesso!" });
          }
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  //buscar os dados dos usuários
  router.get("/usuarios", async (req, res) => {
    try {
      const [rows] = await mysqlDB.promise().query(`
          SELECT u.idUsers, u.Nome, u.Apelido, d.Nome_Departamento
          FROM Users u
          JOIN Departamentos d ON u.Departamentos_idDepartamentos = d.idDepartamentos
        `);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  });
  // Rota para buscar departamentos
  router.get("/departamentos", async (req, res) => {
    try {
      const [rows] = await mysqlDB
        .promise()
        .query("SELECT idDepartamentos, Nome_Departamento FROM Departamentos");
      res.json(rows);
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
      res.status(500).json({ message: "Erro ao buscar departamentos" });
    }
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
  // Historico completo
  router.get("/registos-agrupados/:idUsers", async (req, res) => {
    const { idUsers } = req.params;

    try {
      const query = `
        SELECT 
          YEAR(Entrada1) AS Ano,
          MONTH(Entrada1) AS Mes,
          COUNT(*) AS TotalRegistos,
          SUM(
            TIMESTAMPDIFF(MINUTE, Entrada1, Saida1) + 
            IFNULL(TIMESTAMPDIFF(MINUTE, Entrada2, Saida2), 0)
          ) / 60 AS HorasTrabalhadas,
          GROUP_CONCAT(
            CONCAT(
              Entrada1, ',', Saida1, ',', Entrada2, ',', Saida2
            ) SEPARATOR ';'
          ) AS RegistosDetalhados
        FROM Registos_de_tempo
        WHERE Users_idUsers = ?
        GROUP BY Ano, Mes
        ORDER BY Ano DESC, Mes DESC;
      `;

      const [rows] = await mysqlDB.promise().query(query, [parseInt(idUsers)]);

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Registos não encontrados para este usuário" });
      }

      res.json(rows);
    } catch (error) {
      console.error("Erro ao buscar registos agrupados:", error);
      res.status(500).json({ message: "Erro ao buscar registos agrupados" });
    }
  });
  // actualizar
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
      nome,
      apelido,
      password,
      email,
      perfil,
      departamentos_idDepartamentos,
    } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const query = `
        UPDATE Users 
        SET Nome = ?, Apelido = ?, Password = ?, Email = ?, Perfil = ?, Departamentos_idDepartamentos = ? 
        WHERE idUsers = ?
      `;
      const values = [
        nome,
        apelido,
        hashedPassword,
        email,
        perfil,
        departamentos_idDepartamentos,
        id,
      ];
      await mysqlDB.promise().query(query, values);

      console.log("Usuário atualizado com sucesso");
      res.json({ message: "usuário atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
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
  // Rota para solicitar o envio do código de verificação por e-mail
  router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      // Gerar e enviar o código de verificação por e-mail
      res
        .status(200)
        .json({ message: "Código de verificação enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      res.status(500).json({ error: "Erro ao solicitar redefinição de senha" });
    }
  });
  // Rota para verificar o código de verificação e redirecionar para a página de redefinição de senha
  router.post("/verify-code", async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Verificar se o código de verificação é válido
      // Se for válido, redirecionar para a página de redefinição de senha
      // Caso contrário, retornar uma mensagem de erro

      res.status(200).json({ message: "Código de verificação válido" });
    } catch (error) {
      console.error("Erro ao verificar código de verificação:", error);
      res
        .status(500)
        .json({ error: "Erro ao verificar código de verificação" });
    }
  });
  // Rota para redefinir a senha
  router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Atualizar a senha do usuário com a nova senha fornecida

      res.status(200).json({ message: "Senha redefinida com sucesso" });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      res.status(500).json({ error: "Erro ao redefinir senha" });
    }
  });
  // Rota para buscar anos
  router.get("/anos/:idUsers", async (req, res) => {
    try {
      const [rows] = await mysqlDB
        .promise()
        .query(
          "SELECT DISTINCT YEAR(Entrada1) as ano FROM Registos_de_tempo ORDER BY ano DESC"
        );
      const anos = rows.map((row) => ({ ano: row.ano, temRegistros: true }));
      res.json(anos);
    } catch (error) {
      console.error("Erro ao buscar anos:", error);
      res.status(500).json({ message: "Erro ao buscar anos" });
    }
  });

  // Rota para buscar meses de um ano específico
  router.get("/meses/:ano", async (req, res) => {
    const { ano } = req.params;
    try {
      const [rows] = await mysqlDB
        .promise()
        .query(
          "SELECT DISTINCT MONTH(Entrada1) as Mes FROM Registos_de_tempo WHERE YEAR(Entrada1) = ? ORDER BY Mes DESC",
          [ano]
        );

      const mesesComRegistros = rows.map((row) => row.Mes);
      const todosOsMeses = Array.from({ length: 12 }, (_, i) => i + 1);

      const meses = todosOsMeses.map((mes) => ({
        Mes: mes,
        temRegistros: mesesComRegistros.includes(mes),
      }));

      res.json(meses);
    } catch (error) {
      console.error("Erro ao buscar meses:", error);
      res.status(500).json({ message: "Erro ao buscar meses" });
    }
  });

  return router;
};
