/*===============================
    Controladores producto
===============================*/
import ProductModels from "../models/product.models.js";
import connection from "../database/db.js";

export const getAllProducts = async (req, res) => {
  try {
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

    const [results] = await connection.query(query, params);
    res.json(results);
  } catch (error) {
    console.error("Error obteniendo productos:", error.message);
    res.status(500).json({
      error: "Error interno al obtener productos",
    });
  }
};

////////////////////////
// Get product by id -> Consultar producto por su id
export const getProductById = async (req, res) => {
  try {
    let { id } = req.params;

    const [rows] = await ProductModels.selectProductWhereId(id);

    // Hacemos la consulta, y tenemos el resultado en la variable rows
    // Compruebo que existe el producto con ese id
    if (rows.length === 0) {
      console.log("Error, no existe producto con ese id");

      return res.status(404).json({
        message: `No se encontro producto con id ${id}`,
      });
    }

    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.error("Error obteniendo producto con id", error.message);

    res.status(500).json({
      error: "Error interno al obtener un producto con id",
    });
  }
};

/////////Crear producto/////////
export const createProduct = async (req, res) => {
  try {
    // Unificar con la columna `img` de la base de datos
    const { nombre, precio, img, categoria } = req.body;
    if (!nombre || !precio) {
      return res
        .status(400)
        .json({ error: "El nombre y el precio son obligatorios" });
    }

    // Insertar siempre con la estructura (nombre, precio, img, categoria)
    const imagenValue = img && img.trim() !== "" ? img.trim() : null;
    const [result] = await connection.query(
      "INSERT INTO productos (nombre, precio, img, categoria) VALUES (?, ?, ?, ?)",
      [nombre, precio, imagenValue, categoria || null]
    );

    res.json({
      id: result.insertId,
      nombre,
      precio,
      img: imagenValue,
      categoria,
    });
  } catch (error) {
    console.error("Error creando producto:", error.message);
    res.status(500).json({
      error: "Error interno al crear un producto",
    });
  }
};

// Modificar un producto
export const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    await connection.query(
      "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
      [nombre, precio, id]
    );
    res.json({ mensaje: "Producto actualizado" });
  } catch (error) {
    console.error("Error modificando producto:", error.message);
    res.status(500).json({
      error: "Error interno al modificar un producto",
    });
  }
};

// Eliminar producto
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await connection.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.error("Error eliminando producto:", error.message);
    res.status(500).json({
      error: "Error interno al eliminar un producto",
    });
  }
};
