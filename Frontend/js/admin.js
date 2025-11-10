document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-productos");
  const form = document.getElementById("form-agregar");
  const nombre = document.getElementById("nombre");
  const precio = document.getElementById("precio");
  const imagen = document.getElementById("imagen");

  // Cargar productos desde localStorage o ejemplo inicial
  let productos = JSON.parse(localStorage.getItem("productos")) || [
    {
      id: 1,
      nombre: "PlayStation 5",
      precio: 800,
      imagen: "./assets/img/ps5.jpg",
    },
    {
      id: 2,
      nombre: "Xbox Series X",
      precio: 750,
      imagen: "./assets/img/xbox-seriesx.jpg",
    },
    {
      id: 3,
      nombre: "iPhone 15",
      precio: 1200,
      imagen:
        "./assets/img/xbox.jpg",
    },
  ];

  function guardar() {
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  function renderProductos() {
    lista.innerHTML = "";
    productos.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <div class="info">
          <img src="${p.imagen || "https://via.placeholder.com/60"}" />
          <span><strong>${p.nombre}</strong> - $${p.precio}</span>
        </div>
        <div class="botones">
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
        </div>
      `;

      // Botón eliminar
      div.querySelector(".eliminar").addEventListener("click", () => {
        productos = productos.filter((x) => x.id !== p.id);
        guardar();
        renderProductos();
      });

      // Botón editar
      div.querySelector(".editar").addEventListener("click", () => {
        const nuevoNombre = prompt("Nuevo nombre:", p.nombre);
        const nuevoPrecio = prompt("Nuevo precio:", p.precio);
        if (nuevoNombre && nuevoPrecio) {
          p.nombre = nuevoNombre;
          p.precio = Number(nuevoPrecio);
          guardar();
          renderProductos();
        }
      });

      lista.appendChild(div);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      nombre: nombre.value.trim(),
      precio: parseFloat(precio.value),
      imagen: imagen.value.trim() || "https://via.placeholder.com/60",
    };

    if (nuevo.nombre && nuevo.precio) {
      productos.push(nuevo);
      guardar();
      renderProductos();
      form.reset();
    } else {
      alert("Completa nombre y precio correctamente.");
    }
  });

  renderProductos();
});
