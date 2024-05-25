const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

const conn = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(
    `Conectado ao banco de dados MongoDB no servidor ${dbHost}:${dbPort}`
  );
});

mongoose.connection.on("error", (err) => {
  console.error("Erro ao conectar ao banco de dados MongoDB:", err.message);
  process.exit(1);
});

module.exports = conn;
