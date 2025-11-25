import environments from "../config/environments.js";
import mysql from "mysql2/promise";

const { db } = environments;

let connection;

async function initConnection() {
  try {
    connection = await mysql.createConnection({
      host: db.host,
      user: db.user,
      password: db.password || "",
      database: db.name,
    });
    console.log("Conectado a la base de datos MySQL ✅");
  } catch (err) {
    console.error("Error al conectar con MySQL:", err.message);
    throw err;
  }
}

await initConnection();

export default connection;
