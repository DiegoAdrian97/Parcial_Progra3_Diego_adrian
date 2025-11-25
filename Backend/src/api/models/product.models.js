/*===========================
    Modelos producto
===========================*/
import connection from "../database/db.js";
const selectAllProducts = () => {
  const sql = `SELECT * FROM productos`;
  return connection.query(sql);
};

// Seleccionar producto por id
const selectProductWhereId = (id) => {
  let sql = `SELECT * FROM productos WHERE id = ?`;
  return connection.query(sql, [id]);
};

// Crear producto
const insertProduct = (nombre, img, categoria, precio) => {
  let sql =
    "INSERT INTO productos (nombre, precio, img, categoria) VALUES (?, ?, ?, ?)";

  return connection.query(sql, [nombre, precio, img, categoria]);
};

// Actualizar producto
const updateProduct = (nombre, img, precio, categoria, id) => {
  let sql = `
        UPDATE productos
        SET nombre = ?, img = ?, precio = ?, categoria = ?
        WHERE id = ?
    `;

  return connection.query(sql, [nombre, img, precio, categoria, id]);
};

// Eliminar producto
const deleteProduct = (id) => {
  let sql = "DELETE FROM productos WHERE id = ?";

  return connection.query(sql, [id]);
};

export default {
  selectAllProducts,
  selectProductWhereId,
  insertProduct,
  updateProduct,
  deleteProduct,
};
