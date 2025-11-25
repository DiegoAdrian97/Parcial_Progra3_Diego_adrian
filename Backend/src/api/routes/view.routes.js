import { Router } from "express";
import { productsView, ventasView } from "../controllers/view.controllers.js";
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

router.get("/eliminar", (req, res) => {
  res.render("admin/producto_eliminar", {
    title: "Eliminar",
    about: "Eliminar producto",
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

// Ventas
router.get("/admin/ventas", ventasView);

router.get("/admin/venta/:id", (req, res) => {
  const { id } = req.params;
  res.render("admin/venta_detalle", { title: "Detalle Venta", id });
});

// Exportamos las rutas de las vistas
export default router;
