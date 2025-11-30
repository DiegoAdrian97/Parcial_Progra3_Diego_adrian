/*===============================
    Controladores compra
===============================*/
import CompraModels from "../models/compra.models.js";

const selectAllCompras = async (req, res) => {
  try {
    const compras = await CompraModels.selectAllCompras();
    res.json(compras);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ error: "Error al obtener las compras" });
  }
};

const selectCompraById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await CompraModels.selectCompraById(id);

    if (rows.length === 0) {
      return res.status(404).send("Venta no encontrada");
    }

    const venta = rows[0];

    let productos = [];
    if (venta.productos && typeof venta.productos === "string") {
      const items = venta.productos
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      productos = items.map((item) => {
        const [nombre, cantidad] = item.split(":").map((s) => s.trim());
        return { nombre, cantidad: parseInt(cantidad) || 1 };
      });
    }
    return res.send(201).json({
      venta,
      productos,
    });
  } catch (error) {
    console.error("Error obteniendo la compra:", error.message);
    res.status(500).json({
      error: "Error interno al obtener la compra",
    });
  }
};

const crearCompra = async (req, res) => {
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

    return res.json({
      message: "Compra guardada con éxito",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error creando compra:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export { selectAllCompras, selectCompraById, crearCompra };
