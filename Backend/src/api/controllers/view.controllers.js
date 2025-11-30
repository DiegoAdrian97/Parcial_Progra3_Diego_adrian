/*===============================
    Controladores producto
===============================*/

import ProductModels from "../models/product.models.js";
import connection from "../database/db.js";
import { parseProductosString } from "../utils/parseProductos.js";
import CompraModels from "../models/compra.models.js";

export const createProductView = (req, res) => {
  res.render("admin/producto_nuevo", {
    title: "Crear",
    about: "Crear producto",
  });
};
export const editProductView = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await ProductModels.selectProductWhereId(id);

    const producto = rows.length ? rows[0] : null;
    if (!producto) return res.status(404).send("Producto no encontrado");

    res.render("admin/producto_editar", {
      title: "Editar producto",
      producto,
    });
  } catch (error) {
    console.error("Error cargando producto para editar:", error);
    res.status(500).send("Error interno");
  }
};

export const editProductAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria, img } = req.body;

    await ProductModels.updateProduct(nombre, img, precio, categoria, id);

    res.redirect("/admin/productos");
  } catch (error) {
    console.error("Error guardando producto:", error);
    res.status(500).send("Error al guardar");
  }
};
export const deleteProductView = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await ProductModels.selectProductWhereId(id);
    const producto = rows.length ? rows[0] : null;

    if (!producto) return res.status(404).send("Producto no encontrado");

    res.render("admin/producto_eliminar", {
      title: "Eliminar producto",
      producto,
    });
  } catch (error) {
    console.error("Error cargando producto para eliminar:", error);
    res.status(500).send("Error interno");
  }
};

export const deleteProductAction = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModels.deleteProduct(id);
    res.redirect("/admin/productos");
  } catch (error) {
    console.error("Error eliminando producto:", error);
    res.status(500).send("Error al eliminar");
  }
};

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
    const [rows] = await CompraModels.selectAllCompras();
    res.render("admin/ventas", {
      title: "Ventas",
      about: "Listado de ventas",
      ventas: rows,
    });
  } catch {
    console.error(error);
    res.status(500).send("Error al cargar ventas");
  }
};
/*===============================
    Detalle venta (vista)
===============================*/

export const detalleVentaView = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await CompraModels.selectCompraById(id);

    if (!rows || rows.length === 0) {
      return res.status(404).render("errors/404", {
        message: "Venta no encontrada",
      });
    }

    const venta = rows[0];

    // Procesar productos
    const productos = parseProductosString(venta.productos);

    // Formateo de fecha
    const fecha = venta.fecha ? new Date(venta.fecha) : null;
    const fechaFormateada = fecha ? fecha.toLocaleDateString("es-AR") : "";

    res.render("admin/venta_detalle", {
      title: "Detalle Venta",
      venta: {
        ...venta,
        fechaFormateada,
      },
      productos,
    });
  } catch (error) {
    console.error("Error obteniendo venta:", error);
    res.status(500).render("errors/500", {
      message: "Error interno",
    });
  }
};
