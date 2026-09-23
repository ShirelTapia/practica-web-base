import './style.css'
import { productos } from './datos.js'

const catalogo = document.getElementById('catalogo')
const listaPedido = document.getElementById('lista-pedido')
const textoTotal = document.getElementById('total')
const btnVaciar = document.getElementById('btn-vaciar')

const pedido = []
// 1. Mostrar productos en el catálogo
function mostrarProductos(lista) {
  if (!catalogo) return;

  catalogo.innerHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition border border-gray-100">
      <div>
        <h3 class="text-lg font-bold text-gray-800">${p.nombre}</h3>
        <span class="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded mt-1 mb-2">${p.categoria}</span>
        <p class="text-indigo-600 font-semibold">$${p.precio} MXN</p>
      </div>
      <button data-id="${p.id}" class="mt-4 bg-indigo-500 text-white font-medium py-2 px-4 rounded hover:bg-indigo-600 transition">
        Agregar
      </button>
    </div>
  `).join('');
}

// 2. Mostrar el pedido actual en el <aside>
function mostrarPedido() {
  if (!listaPedido || !textoTotal) return;

  if (pedido.length === 0) {
    listaPedido.innerHTML = `<p class="text-gray-400 italic">No hay productos agregados</p>`;
    textoTotal.textContent = `$0 MXN`;
    return;
  }

  // Dibujar cada producto del pedido usando map
  listaPedido.innerHTML = pedido.map(p => `
    <li class="flex justify-between items-center bg-gray-50 p-2 rounded">
      <span>${p.nombre}</span>
      <span class="font-semibold text-gray-700">$${p.precio} MXN</span>
    </li>
  `).join('');

  // Calcular el total con reduce
  const total = pedido.reduce((suma, p) => suma + p.precio, 0);
  textoTotal.textContent = `$${total} MXN`;
}

// 3. Escuchar clics en el contenedor del catálogo para agregar productos
if (catalogo) {
  catalogo.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-id]');
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const productoEncontrado = productos.find(p => p.id === id);

    if (productoEncontrado) {
      pedido.push(productoEncontrado);
      mostrarPedido();
    }
  });
}

if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    pedido.length = 0; 
    mostrarPedido();
  });
}


mostrarProductos(productos);


mostrarProductos(productos);

mostrarProductos(productos)


// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------
const pedido = []

// Escribe aquí tu código del Ejercicio 3

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
