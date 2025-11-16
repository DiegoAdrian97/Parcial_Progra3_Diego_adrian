import environments from "./environments.js";
import mysql from "mysql2";

const { db } = environments;

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
});
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL ✅");
});

export default connection;
