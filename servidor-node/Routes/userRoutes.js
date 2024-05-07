const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

require("dotenv").config();

module.exports = (mysqlDB) => {
  router.get("/", async (req, res) => {
    try {
      const [users] = await mysqlDB.promise().query("SELECT * FROM Users");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/register", async (req, res) => {
    const { name, lastname, phone, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO Users (Name, LastName, Phone, Email, PasswordHash) VALUES (?, ?, ?, ?, ?)`;

    mysqlDB.query(
      query,
      [name, lastname, phone, email, hashedPassword],
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

  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const {
      name,
      last_name,
      phone,
      email,
    } = req.body;

    mysqlDB.query(
      "UPDATE Users SET Name=?, LastName=?, Phone=?, Email=? WHERE UserID=?",
      [name, last_name, phone, email, id],
      (error) => {
        if (error) {
          +console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ message: "Perfil atualizado com sucesso!" });
        }
      }
    );
  });

  router.delete("/:id", authenticateToken, (req, res) => {
    const { id } = req.params;

    mysqlDB.query("DELETE FROM Users WHERE UserID=?", [id], (error) => {
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
