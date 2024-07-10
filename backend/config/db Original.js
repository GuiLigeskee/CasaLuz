const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

  try {
    const dbConn = await mongoose.connect(
      `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`
    );

    console.log(`Conectado ao banco de dados MongoDB no servidor ${dbHost}`);
    return dbConn;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conn();
