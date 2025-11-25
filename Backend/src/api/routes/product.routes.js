import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/validateId.js"; // Importamos el middleware
import {
  createProduct,
  getAllProducts,
  getProductById,
  modifyProduct,
  removeProduct,
} from "../controllers/product.controllers.js";

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.post("/", createProduct);

router.put("/", modifyProduct);

router.delete("/:id", validateId, removeProduct);

export default router;
