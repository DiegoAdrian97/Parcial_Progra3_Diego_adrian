import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import {
  compraRoutes,
  productRoutes,
  viewRoutes,
} from "./src/api/routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuro EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Lista de orígenes permitidos
const whiteList = [
  "http://localhost:5500",
  "http://127.0.0.1:5501",
  "http://127.0.0.1:3000",
];

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
app.use("/productos", productRoutes);
app.use("/", viewRoutes);
app.use("/", compraRoutes);

// Servir archivos estáticos (imágenes del frontend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "src", "public")));

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
