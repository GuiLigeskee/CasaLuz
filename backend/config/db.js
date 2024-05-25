const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const authDatabase = "adminCasaLuz"; // Ajuste para o banco de dados onde o usuário adminCasaLuz está definido

const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDatabase}`;

const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.on("connected", () => {
  console.log(
    `Conectado ao banco de dados MongoDB no servidor ${dbHost}:${dbPort}`
  );
});

conn.on("error", (err) => {
  console.error("Erro ao conectar ao banco de dados MongoDB:", err.message);
  process.exit(1);
});

module.exports = conn;
