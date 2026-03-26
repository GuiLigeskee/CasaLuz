const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb://webcasaluz:${dbPassword}@ac-ztywooq-shard-00-00.ijipr5w.mongodb.net:27017,ac-ztywooq-shard-00-01.ijipr5w.mongodb.net:27017,ac-ztywooq-shard-00-02.ijipr5w.mongodb.net:27017/?ssl=true&replicaSet=atlas-lmmtlj-shard-0&authSource=admin&appName=Cluster0`
    );

    console.log("Conectado ao banco de dados MongoDB Atlas!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
