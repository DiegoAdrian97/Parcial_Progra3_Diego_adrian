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
document.getElementById("descargar-pdf").addEventListener("click", () => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  script.onload = generarPDF;
  document.body.appendChild(script);
});

document.getElementById("descargar-pdf").addEventListener("click", () => {
  const cdn = document.createElement("script");
  cdn.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  cdn.onload = generarTicketPDF;
  document.body.appendChild(cdn);
});

function generarTicketPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  let y = 20;

  // LOGO TEXT
  pdf.setFontSize(22);
  pdf.text("Electronics Store", 20, y);
  y += 10;

  // LINEA
  pdf.setLineWidth(0.5);
  pdf.line(20, y, 190, y);
  y += 10;

  // NUMERO DE ORDEN
  const nroOrden = document.getElementById("nro-orden").innerText;

  pdf.setFontSize(12);
  pdf.text(`Ticket de Compra`, 20, y);
  y += 7;
  pdf.text(`N° de Orden: ${nroOrden}`, 20, y);
  y += 7;
  pdf.text(`Cliente: ${localStorage.getItem("userName") || "Cliente"}`, 20, y);
  y += 7;
  pdf.text(`Fecha: ${document.getElementById("fecha-hoy").innerText}`, 20, y);
  y += 15;

  pdf.setFontSize(14);
  pdf.text("Detalle del pedido:", 20, y);
  y += 10;

  // TABLA MANUAL
  const filas = document.querySelectorAll("#lista-productos tr");

  filas.forEach((fila) => {
    const tds = fila.querySelectorAll("td");
    if (tds.length === 4) {
      pdf.setFontSize(12);
      pdf.text(`Producto: ${tds[0].innerText}`, 20, y);
      y += 6;
      pdf.text(`Cantidad: ${tds[1].innerText}`, 20, y);
      y += 6;
      pdf.text(`Precio Unitario: ${tds[2].innerText}`, 20, y);
      y += 6;
      pdf.text(`Subtotal: ${tds[3].innerText}`, 20, y);
      y += 10;
    }
  });

  // TOTAL
  pdf.setFontSize(14);
  pdf.text(`TOTAL: ${document.getElementById("total-final").innerText}`, 20, y);

  y += 20;

  pdf.save("ticket_compra.pdf");
}
