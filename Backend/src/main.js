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

// Agregar productos
app.post("/productos", (req, res) => {
  const { nombre, precio, imagen } = req.body;
  if (!nombre || !precio) {
    return res.status(400).send("El nombre y el precio son obligatorios");
  }
  if (imagen && imagen.trim() !== "") {
    db.query(
      "INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)",
      [nombre, precio, imagen],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, nombre, precio, imagen });
      }
    );
  } else {
    db.query(
      "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
      [nombre, precio],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, nombre, precio });
      }
    );
  }
});

// Editar productos
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  db.query(
    "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
    [nombre, precio, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ mensaje: "Producto actualizado" });
    }
  );
});

//Eliminar productos
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: "Producto eliminado" });
  });
});

app.post("/compras", (req, res) => {
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
    const sql =
      "INSERT INTO compras (cliente_nombre, productos, total) VALUES (?, ?, ?)";
    db.query(
      sql,
      [datos.cliente_nombre, productosTexto, datos.total],
      (err, result) => {
        if (err) {
          console.error("Error al guardar la compra:", err);
          return res.status(500).send("Error al guardar la compra");
        }
        res.json({
          message: "Compra guardada con éxito",
          id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error en /compras:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
