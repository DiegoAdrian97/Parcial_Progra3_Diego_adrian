import { Router } from "express";
import {
  productsView,
  ventasView,
  detalleVentaView,
  createProductView,
  editProductView,
  editProductAction,
  deleteProductView,
  deleteProductAction,
} from "../controllers/view.controllers.js";
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

router.get("/crear", createProductView);

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

router.get("/admin/productos/editar/:id", editProductView);

router.post("/admin/productos/editar/:id", editProductAction);

// Eliminar producto - mostrar confirmación
router.get("/admin/productos/eliminar/:id", deleteProductView);

// Eliminar producto - procesar eliminación
router.post("/admin/productos/eliminar/:id", deleteProductAction);

// Ventas
router.get("/admin/ventas", ventasView);
// Detalle de venta
router.get("/admin/venta/:id", detalleVentaView);

export default router;
