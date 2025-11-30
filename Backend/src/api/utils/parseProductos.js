export function parseProductosString(productosStr) {
  const productos = [];
  if (!productosStr || typeof productosStr !== "string") return productos;

  const items = productosStr
    .split(",")
    .map((it) => it.trim())
    .filter(Boolean);

  for (const item of items) {
    const parts = item.split(":").map((s) => s.trim());
    const nombre = parts[0] || "";
    const cantidad = parseInt(parts[1], 10) || 1;
    productos.push({ nombre, cantidad });
  }
  return productos;
}
