/*===============================
    Controladores producto
===============================*/

import ProductModels from "../models/product.models.js";
import connection from "../database/db.js";

export const productsView = async (req, res) => {
  try {
    const [rows] = await ProductModels.selectAllProducts();

    res.render("admin/productos", {
      title: "Inicio",
      about: "Listado principal",
      productos: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar productos");
  }
};

export const ventasView = async (req, res) => {
  try {
    const sql =
      "SELECT id, cliente_nombre, productos, total, fecha FROM compras ORDER BY fecha DESC";
    const [rows] = await connection.query(sql);

    // Calcular cantidad de items por venta a partir del campo 'productos'
    const ventas = rows.map((rows) => {
      let cantidad_items = 0;
      if (rows.productos && typeof rows.productos === "string") {
        const parts = rows.productos
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        cantidad_items = parts.length;
      }
      return { ...rows, cantidad_items };
    });

    res.render("admin/ventas", { title: "Ventas", ventas });
  } catch (error) {
    console.error("Error obteniendo ventas:", error.message);
    res.status(500).send("Error al cargar ventas");
  }
};
