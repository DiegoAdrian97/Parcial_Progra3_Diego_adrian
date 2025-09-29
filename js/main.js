//Datos y variables globales
const carrito = [];
const productos = [
  { id: 1, nombre: "arandano", precio: 5000, img: "./assets/img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, img: "./assets/img/banana.jpg" },
  {
    id: 3,
    nombre: "frambuesa",
    precio: 4000,
    img: "./assets/img/frambuesa.png",
  },
  { id: 4, nombre: "frutilla", precio: 3000, img: "./assets/img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, img: "./assets/img/kiwi.jpg" },
  {
    id: 6,
    nombre: "mandarina",
    precio: 800,
    img: "./assets/img/mandarina.jpg",
  },
  { id: 7, nombre: "manzana", precio: 1500, img: "./assets/img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 9000, img: "./assets/img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, img: "./assets/img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, img: "./assets/img/anana.jpg" },
  {
    id: 11,
    nombre: "pomelo-amarillo",
    precio: 2000,
    img: "./assets/img/pomelo-amarillo.jpg",
  },
  {
    id: 12,
    nombre: "pomelo-rojo",
    precio: 2000,
    img: "./assets/img/pomelo-rojo.jpg",
  },
];

//Función principal de inicialización
function init() {
  imprimirDatosAlumno();

  //Mostrar productos y agregar filtro en input
  renderizarProductos();
  filtrarProductos();
  ordenarPorNombre();
  ordenarPorPrecio();
  cargarCarrito();
  vaciarCarrito();
  mostrarCarrito();
  ocultarCarrito();
  actualizarTotal();
  actualizarContadorCarrito();
}

function imprimirDatosAlumno() {
  const alumno = {
    dni: "40139269",
    nombre: "Diego",
    apellido: "Adrian",
  };
  console.log(
    `Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`
  );
  const nav = document.querySelector("header");
  if (nav) {
    nav.innerHTML += `<span>${alumno.nombre} ${alumno.apellido}</span> DNI: ${alumno.dni}`;
  }
}

function renderizarProductos(filtro = "") {
  const contenedor_productos = document.querySelector(".lista_productos");
  contenedor_productos.innerHTML = "";

  //Filtrar productos si hay filtro
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  productosFiltrados.forEach((producto) => {
    //Recorro el array de productos ya filtrados previamente y lo muestro
    const producto_div = document.createElement("div");
    producto_div.classList.add("card");
    producto_div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="add-to-cart" id-prod="${producto.id}">Agregar al carrito</button>
    `;
    contenedor_productos.appendChild(producto_div);
  });
}
function filtrarProductos() {
  //Filtro en tiempo real

  const inputBusqueda = document.querySelector('input[type="text"]');
  inputBusqueda.addEventListener("input", function () {
    renderizarProductos(inputBusqueda.value);
    addToCart(); //Llamo a la funcion para que se active el boton add to cart
  });
}
function ordenarPorNombre() {
  const btnNombre = document.getElementById("ordenar-nombre");

  btnNombre.addEventListener("click", ordenarPorNombre);
  // Ordeno el array productos por nombre
  productos.sort(function (a, b) {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });
  //Actualizo el render de los productos ordenados
  renderizarProductos();
  addToCart();
  //Actualizo el evento del boton de los productos ya ordenados
}

function ordenarPorPrecio() {
  const btnPrecio = document.getElementById("ordenar-precio");
  btnPrecio.addEventListener("click", ordenarPorPrecio);

  // Ordeno el array productos por precio
  productos.sort(function (a, b) {
    return a.precio - b.precio;
  });
  renderizarProductos();
  addToCart();
}

function mostrarCarrito() {
  //Renderizado del carrito
  const contenedor_carrito = document.querySelector(".carrito-items");
  contenedor_carrito.innerHTML = "";
  carrito.forEach((producto, index) => {
    const carrito_div = document.createElement("div");
    carrito_div.classList.add("cart-product");
    carrito_div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="delete-from-cart" data-index="${index}">Eliminar</button>
    `;
    contenedor_carrito.appendChild(carrito_div);
  });
  eliminarProducto(); //Reasigno eventos a los nuevos botones, para que funcione el delete al modificar el carrito
}

function ocultarCarrito() {
  //Funcion para mostrar/ocultar carrito
  const boton_carrito = document.querySelector(".boton_carrito");
  const menu_carrito = document.querySelector(".seccion_carrito");
  boton_carrito.addEventListener("click", function () {
    menu_carrito.classList.toggle("hidden"); //cada vez que se clickea el carrito, se agrega/remueve la clase hidden a ese div, lo que con el CSS oculta o muestra con display none
  });
}

function actualizarTotal() {
  const total_carrito = document.querySelector(".carrito-total");
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  total_carrito.innerText = `Total: $${total}`;
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador_carrito");
  if (contador) {
    contador.innerText = `Carrito-Productos: ${carrito.length}`;
  }
}

function vaciarCarrito() {
  const vaciar_carrito = document.querySelector(".vaciar");
  vaciar_carrito.addEventListener("click", function () {
    carrito.length = 0; //Modifico la logitud del carrito a 0 para vaciarlo
    guardarCarrito();
    mostrarCarrito();
    actualizarTotal();
    actualizarContadorCarrito();
  });
}

//Ejecutar init al cargar la página
document.addEventListener("DOMContentLoaded", init);

//Función para agregar productos al carrito
function addToCart() {
  const add_to_cart_buttons = document.querySelectorAll(".add-to-cart");
  add_to_cart_buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(button.getAttribute("id-prod"));
      const producto = productos.find((p) => p.id === productId);
      if (producto) {
        carrito.push(producto);
        guardarCarrito(); //guardo en localstorage
        mostrarCarrito(); //renderizo carrito
        actualizarTotal(); //actualizo span del total
        actualizarContadorCarrito(); //actualizo span del contador
        console.log(carrito); //muestro en consola
      }
    });
  });
}
function eliminarProducto() {
  //Botones eliminar del carrito
  const delete_from_cart_buttons =
    document.querySelectorAll(".delete-from-cart");
  delete_from_cart_buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index")); //obtengo el indice del elemento

      carrito.splice(index, 1); //splice encuentra un elemento del array segun su indice y lo elimina. El 1 indica la cantidad a eliminar
      //actualizo en localstorage
      guardarCarrito();
      mostrarCarrito();
      actualizarTotal();
      actualizarContadorCarrito();
    });
  });
}

//LOCALSTORAGE
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito.length = 0; //Vacía el array actual
    JSON.parse(carritoGuardado).forEach((item) => carrito.push(item));
  }
}
