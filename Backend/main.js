import express from "express";
import cors from "cors";
import connection from "./src/api/database/db.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { imagenes_front } from "./src/api/utils/path.js";
import CompraModels from "./src/api/models/compra.models.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Lista de orígenes permitidos
const whiteList = ["http://localhost:5500", "http://127.0.0.1:5501"];

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

// Registrar rutas de productos
app.use("/productos", productRoutes);

// Registrar rutas de vistas
app.use("/", viewRoutes);

// Servir archivos estáticos (imágenes del frontend)
app.use("/assets", express.static(imagenes_front));

// Rutas

app.get("/", (req, res) => {
  console.log("Petición al endpoint raíz");
  res.json({ message: "Servidor Express funcionando correctamente" });
});

//Logica de confirmar nueva compra
app.post("/compras", async (req, res) => {
  try {
    const datos = req.body;
    if (!datos || !datos.cliente_nombre || !datos.productos || !datos.total) {
      return res.status(400).send("Faltan datos de la compra");
    }
    let productosArray = datos.productos;
    if (typeof productosArray === "string") {
      try {
        productosArray = JSON.parse(productosArray);
      } catch (err) {
        console.error("Error al parsear productos:", err);
        return res.status(400).send("Formato de productos inválido");
      }
    }
    const productosTexto = productosArray
      .map((p) => `${p.nombre}: ${p.cantidad}`)
      .join(", ");

    const [result] = await CompraModels.insertCompra(
      datos.cliente_nombre,
      productosTexto,
      datos.total
    );

    res.json({
      message: "Compra guardada con éxito",
      id: result.insertId,
    });
    console.log("Compra guardada con éxito", result.insertId);
  } catch (error) {
    console.error("Error en /compras:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
