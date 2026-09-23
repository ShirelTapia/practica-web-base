import './style.css'
import { productos } from './datos.js'

const catalogo = document.getElementById('catalogo')
const listaPedido = document.getElementById('lista-pedido')
const textoTotal = document.getElementById('total')
const btnVaciar = document.getElementById('btn-vaciar')
const contenedorFiltros = document.getElementById('filtros-categoria')

const pedido = []
let categoriaActual = 'todos' // Controla el botón activo

// 1. Mostrar productos en el catálogo
function mostrarProductos(lista) {
  if (!catalogo) return;

  if (lista.length === 0) {
    catalogo.innerHTML = `<p class="col-span-full text-center text-gray-400 py-8">No hay productos en esta categoría</p>`;
    return;
  }

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

// 2. Renderizar botones de filtro dinámicamente con las categorías de los datos
function mostrarFiltros() {
  if (!contenedorFiltros) return;

  // Extraer categorías únicas de los productos
  const categoriasUnicas = ['todos', ...new Set(productos.map(p => p.categoria))];

  contenedorFiltros.innerHTML = categoriasUnicas.map(cat => {
    const activo = categoriaActual === cat;
    // Clases condicionales de Tailwind para el botón activo y los inactivos
    const clasesActivas = activo 
      ? 'bg-indigo-600 text-white shadow' 
      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200';

    return `
      <button data-categoria="${cat}" class="px-4 py-2 rounded-lg font-medium text-sm transition capitalize ${clasesActivas}">
        ${cat}
      </button>
    `;
  }).join('');
}

// 3. Mostrar el pedido actual en el <aside>
function mostrarPedido() {
  if (!listaPedido || !textoTotal) return;

  if (pedido.length === 0) {
    listaPedido.innerHTML = `<p class="text-gray-400 italic">No hay productos agregados</p>`;
    textoTotal.textContent = `$0 MXN`;
    return;
  }

  listaPedido.innerHTML = pedido.map(p => `
    <li class="flex justify-between items-center bg-gray-50 p-2 rounded">
      <span>${p.nombre}</span>
      <span class="font-semibold text-gray-700">$${p.precio} MXN</span>
    </li>
  `).join('');

  const total = pedido.reduce((suma, p) => suma + p.precio, 0);
  textoTotal.textContent = `$${total} MXN`;
}

// 4. Escuchar clics en el catálogo (para agregar productos)
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

// 5. Escuchar clics en los botones de filtro de categoría
if (contenedorFiltros) {
  contenedorFiltros.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-categoria]');
    if (!boton) return;

    categoriaActual = boton.dataset.categoria;

    // Filtrar la lista o mostrar todos
    const listaFiltrada = categoriaActual === 'todos' 
      ? productos 
      : productos.filter(p => p.categoria === categoriaActual);

    mostrarFiltros();       // Actualiza los estilos visuales de los botones
    mostrarProductos(listaFiltrada); // Pinta las tarjetas filtradas
  });
}

// 6. Vaciar el pedido
if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    pedido.length = 0;
    mostrarPedido();
  });
}

// Inicialización al cargar la página
mostrarFiltros();
mostrarProductos(productos);
