const productos = [
  {
    id: 1,
    nombre: "Hollow knight silksong",
    descripcion: "“Entra al reino. Desafía tus límites. Vive Silksong.”",
    precio: 47500,
    imagen: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/05/Silksong.jpg/250px-Silksong.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
  },
  {
    id: 2,
    nombre: "Gamble With Your Friends",
    descripcion: "Apuesta, ríe y descubre quién conoce mejor a sus amigos.",
    precio: 21000,
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3892270/78a9deef0ef784825518781a668724e219099d1f/capsule_616x353.jpg?t=1790878645"
  },
  {
    id: 3,
    nombre: "Golf it",
    descripcion: "“Apunta, golpea y supera a tus amigos.”",
    precio: 21500,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/571740/capsule_616x353.jpg?t=1790080653"
  },
  {
    id: 4,
    nombre: "Cult of the lamb",
    descripcion: "Crea tu culto, conquista el mundo.",
    precio: 70000,
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1313140/cb5ff4e1c40adac0ea71aace62c3020a25f29d50/capsule_616x353.jpg?t=1786554901"
  },
  {
    id: 5,
    nombre: "Raft",
    descripcion: "Sobrevive al mar. Construye tu destino.",
    precio: 49000,
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/capsule_616x353.jpg?t=1727184011"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
