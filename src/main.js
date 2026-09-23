import './style.css'
import { productos } from './datos.js'


const catalogo = document.getElementById('catalogo')


function mostrarProductos(lista) {
  if (!catalogo) return;

  catalogo.innerHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 class="text-lg font-bold text-gray-800">${p.nombre}</h3>
        <p class="text-indigo-600 font-semibold mt-2">$${p.precio} MXN</p>
      </div>
      <button data-id="${p.id}" class="mt-4 bg-indigo-500 text-white font-medium py-2 px-4 rounded hover:bg-indigo-600 transition">
        Agregar
      </button>
    </div>
  `).join('');
}

// Ejecutamos la función pasando los productos importados
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
