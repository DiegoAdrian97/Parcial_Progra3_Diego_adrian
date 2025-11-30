import { Router } from "express";
import { crearCompra } from "../controllers/compra.controllers.js";

const router = Router();

router.post("/compras", crearCompra);

export default router;
