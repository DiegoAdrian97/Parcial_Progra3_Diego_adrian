/*===========================
    Modelos compra
===========================*/
import connection from "../database/db.js";

// Obtener todas las compras
const selectAllCompras = () => {
  const sql = `SELECT id, cliente_nombre, productos, total, fecha FROM compras ORDER BY fecha DESC`;
  return connection.query(sql);
};

// Obtener compra por id
const selectCompraById = (id) => {
  const sql = `SELECT id, cliente_nombre, productos, total, fecha FROM compras WHERE id = ?`;

  return connection.query(sql, [id]);
};
// Crear compra
const insertCompra = (cliente_nombre, productos, total) => {
  const sql = `INSERT INTO compras (cliente_nombre, productos, total) VALUES (?, ?, ?)`;
  return connection.query(sql, [cliente_nombre, productos, total]);
};

export default {
  selectAllCompras,
  selectCompraById,
  insertCompra,
};
