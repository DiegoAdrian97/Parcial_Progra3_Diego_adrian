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
  const fechaFormateada = fecha.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  document.getElementById("fecha-hoy").textContent = fechaFormateada;

  document.getElementById("volver").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("productos");
    localStorage.removeItem("userName");

    window.location.href = "bienvenida.html";
  });
});
