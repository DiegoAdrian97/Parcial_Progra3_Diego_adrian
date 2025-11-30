function generarNumeroOrden() {
  let idCompra = localStorage.getItem("id_compra");

  if (idCompra) {
    document.getElementById("nro-orden").innerText = "#000" + idCompra;
  } else {
    document.getElementById("nro-orden").innerText =
      "Hubo un error en generar el nro de orden";
  }
}

// Crear número de orden y mostrarlo en la página
const numeroOrden = generarNumeroOrden();

document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuario") || "Cliente";
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  document.getElementById("nombre-usuario").textContent = usuario;

  const tbody = document.getElementById("lista-productos");
  let total = 0;

  carrito.forEach((item) => {
    const fila = document.createElement("tr");
    const subtotal = item.precio * (item.cantidad || 1);
    total += subtotal;

    fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad || 1}</td>
            <td>$${item.precio.toLocaleString()}</td>
            <td>$${subtotal.toLocaleString()}</td>
          `;
    tbody.appendChild(fila);
  });

  document.getElementById("total-final").textContent =
    "$" + total.toLocaleString();

  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString("es-AR");
  document.getElementById("fecha-hoy").textContent = fechaFormateada;

  let volver = document.getElementById("volver");
  volver.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "bienvenida.html";
  });
});
