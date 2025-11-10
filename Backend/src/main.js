import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();

// Lista de orígenes permitidos
const whiteList = ["http://localhost:5500", "http://127.0.0.1:5500"];
app.use(express.json());
// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado por CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// Rutas
app.get("/", (req, res) => {
  console.log("Petición al endpoint raíz");
  res.json({ message: "Servidor Express funcionando correctamente" });
});

// backend/index.js
app.get("/productos", (req, res) => {
  const { categoria, filtro } = req.query;

  let query = "SELECT * FROM productos";
  const params = [];

  if (categoria && categoria !== "Todos") {
    query += " WHERE categoria = ?";
    params.push(categoria);
  }

  if (filtro) {
    query += params.length ? " AND" : " WHERE";
    query += " nombre LIKE ?";
    params.push(`%${filtro}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).send("Error al obtener productos");
      return;
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
