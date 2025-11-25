import { Router } from "express";
import { productsView, ventasView } from "../controllers/view.controllers.js";
import ProductModels from "../controllers/../models/product.models.js";
const router = Router();

// Gracias al middleware Router, todas las peticiones (get, post, put, delete) directamente van al modulo productRoutes que se encargan de manejarlas

router.get("/", productsView);

// Rutas de utilidad / admin
router.get("/consultar", (req, res) => {
  // Mostrar formulario / vista para consultar un producto (usar plantilla de editar si no hay una específica)
  res.render("admin/producto_editar", {
    title: "Consultar",
    about: "Consultar producto por id",
  });
});

router.get("/crear", (req, res) => {
  res.render("admin/producto_nuevo", {
    title: "Crear",
    about: "Crear producto",
  });
});

router.get("/modificar", (req, res) => {
  res.render("admin/producto_editar", {
    title: "Modificar",
    about: "Actualizar producto",
  });
});

// Rutas del panel de administración
router.get("/admin/login", (req, res) => {
  res.render("admin/login", { title: "Login Admin" });
});

router.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", { title: "Dashboard" });
});

// Mostrar listado de productos en /admin/productos
router.get("/admin/productos", productsView);

// Editar producto - mostrar formulario con datos
router.get("/admin/productos/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await ProductModels.selectProductWhereId(id);
    const producto = rows && rows[0] ? rows[0] : null;
    if (!producto) return res.status(404).send("Producto no encontrado");
    res.render("admin/producto_editar", { title: "Editar producto", producto });
  } catch (error) {
    console.error("Error cargando producto para editar:", error);
    res.status(500).send("Error interno");
  }
});

// Editar producto - procesar formulario
router.post("/admin/productos/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria, img } = req.body;
    await ProductModels.updateProduct(nombre, img, precio, categoria, id);
    res.redirect("/admin/productos");
  } catch (error) {
    console.error("Error al guardar producto editado:", error);
    res.status(500).send("Error al guardar producto");
  }
});

// Eliminar producto - mostrar confirmación
router.get("/admin/productos/eliminar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await ProductModels.selectProductWhereId(id);
    const producto = rows && rows[0] ? rows[0] : null;
    if (!producto) return res.status(404).send("Producto no encontrado");
    res.render("admin/producto_eliminar", {
      title: "Eliminar producto",
      producto,
    });
  } catch (error) {
    console.error("Error cargando producto para eliminar:", error);
    res.status(500).send("Error interno");
  }
});

// Eliminar producto - procesar eliminación
router.post("/admin/productos/eliminar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModels.deleteProduct(id);
    res.redirect("/admin/productos");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).send("Error al eliminar producto");
  }
});

// Ventas
router.get("/admin/ventas", ventasView);

router.get("/admin/venta/:id", (req, res) => {
  const { id } = req.params;
  res.render("admin/venta_detalle", { title: "Detalle Venta", id });
});

// Exportamos las rutas de las vistas
export default router;
