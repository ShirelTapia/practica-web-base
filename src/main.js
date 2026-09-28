import './style.css'

// Catálogo exacto de tus productos
const productos = [
  { id: 1, nombre: 'Chalecos de obra', categoria: 'chalecos', precio: 150 },
  { id: 2, nombre: 'Chalecos admin', categoria: 'chalecos', precio: 700 },
  { id: 3, nombre: 'Serigrafía (min. 100 pzas / 1 tinta)', categoria: 'impresión', precio: 20 },
  { id: 4, nombre: 'Gorra (a partir de 30 pzas)', categoria: 'accesorios', precio: 65 },
  { id: 5, nombre: 'Overoles', categoria: 'uniformes', precio: 420 },
  { id: 6, nombre: 'Bolsas de manta (bordado)', categoria: 'bolsas', precio: 350 },
  { id: 7, nombre: 'Bolsas de manta (sublimado)', categoria: 'bolsas', precio: 280 }
]

const catalogo = document.getElementById('catalogo')
const listaPedido = document.getElementById('lista-pedido')
const textoTotal = document.getElementById('total')
const btnVaciar = document.getElementById('btn-vaciar')
const contenedorFiltros = document.getElementById('filtros-categoria')

// Elementos de Pedidos Registrados
const contenedorPedidos = document.getElementById('pedidos-registrados')

// Estructuras de pedidos y estados
const pedidosRegistrados = []
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado']
const COLORES = {
  'Pendiente': 'bg-yellow-100 border-yellow-400 text-yellow-900',
  'En preparación': 'bg-blue-100 border-blue-400 text-blue-900',
  'Entregado': 'bg-green-100 border-green-400 text-green-900'
}

// Carrito actual
const pedido = []

// Filtros de categoría
let categoriaActual = 'todos'

// 1. Mostrar productos en el catálogo
function mostrarProductos(lista) {
  if (!catalogo) return

  if (!lista || lista.length === 0) {
    catalogo.innerHTML = `<p class="col-span-full text-center text-gray-400 py-8">No hay productos disponibles</p>`
    return
  }

  catalogo.innerHTML = lista.map(p => `
    <div class="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition border border-pink-100">
      <div>
        <h3 class="text-lg font-bold text-gray-800">${p.nombre}</h3>
        <span class="inline-block bg-pink-100 text-pink-700 text-xs px-2.5 py-1 rounded-full font-medium mt-1 mb-2 capitalize">${p.categoria}</span>
        <p class="text-pink-600 font-semibold">$${p.precio} MXN</p>
      </div>
      <button data-id="${p.id}" class="mt-4 bg-pink-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-pink-600 transition shadow-sm">
        Agregar
      </button>
    </div>
  `).join('')
}

// 2. Renderizar botones de filtro
function mostrarFiltros() {
  if (!contenedorFiltros) return

  const categoriasUnicas = ['todos', ...new Set(productos.map(p => p.categoria))]

  contenedorFiltros.innerHTML = categoriasUnicas.map(cat => {
    const activo = categoriaActual === cat
    const clasesActivas = activo 
      ? 'bg-pink-600 text-white shadow-sm' 
      : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-200'

    return `
      <button data-categoria="${cat}" class="px-4 py-2 rounded-xl font-medium text-sm transition capitalize ${clasesActivas}">
        ${cat}
      </button>
    `
  }).join('')
}

// 3. Mostrar pedido actual en el carrito
function mostrarPedido() {
  if (!listaPedido || !textoTotal) return

  if (pedido.length === 0) {
    listaPedido.innerHTML = `<p class="text-gray-400 italic">No hay productos agregados</p>`
    textoTotal.textContent = `$0 MXN`
    return
  }

  listaPedido.innerHTML = pedido.map(p => `
    <li class="flex justify-between items-center bg-pink-50 p-2.5 rounded-lg border border-pink-100">
      <span class="text-gray-700 font-medium">${p.nombre}</span>
      <span class="font-semibold text-pink-600">$${p.precio} MXN</span>
    </li>
  `).join('')

  const total = pedido.reduce((suma, p) => suma + p.precio, 0)
  textoTotal.textContent = `$${total} MXN`
}

// 4. Mostrar las tarjetas de Pedidos Registrados
function mostrarPedidosRegistrados() {
  if (!contenedorPedidos) return

  if (pedidosRegistrados.length === 0) {
    contenedorPedidos.innerHTML = `<p class="text-gray-400 italic col-span-full py-4 text-center">No hay pedidos registrados todavía.</p>`
    return
  }

  contenedorPedidos.innerHTML = pedidosRegistrados.map(p => {
    const claseColor = COLORES[p.estado] || 'bg-white border-gray-200'
    const listaProductos = p.productos.map(prod => `<li>- ${prod.nombre}: $${prod.precio} MXN</li>`).join('')

    return `
      <div class="p-5 rounded-xl border-2 transition shadow-sm flex flex-col justify-between gap-3 ${claseColor}">
        <div>
          <div class="flex justify-between items-start mb-2 gap-2">
            <h3 class="font-bold text-gray-900 text-lg">${p.cliente.nombre}</h3>
            <span class="text-xs px-2.5 py-1 rounded-full font-bold uppercase border bg-white/80">
              ${p.estado}
            </span>
          </div>

          <p class="text-xs text-gray-600 mb-3">Teléfono: ${p.cliente.telefono} | Correo: ${p.cliente.correo}</p>

          <p class="text-xs font-semibold text-gray-700 mb-1">Productos:</p>
          <ul class="space-y-1 text-sm text-gray-800 mb-3 pl-2">
            ${listaProductos}
          </ul>

          <p class="text-right font-bold text-base pt-2 border-t border-gray-300">
            Total: $${p.total} MXN
          </p>
        </div>

        ${p.estado !== 'Entregado' ? `
          <button data-avanzar="${p.id}" class="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-xl transition text-sm shadow-sm">
            Avanzar estado
          </button>
        ` : ''}
      </div>
    `
  }).join('')
}

if (contenedorPedidos) {
  contenedorPedidos.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-avanzar]')
    if (!boton) return

    const idPedido = Number(boton.dataset.avanzar)
    const pedidoEncontrado = pedidosRegistrados.find(p => p.id === idPedido)

    if (pedidoEncontrado) {
      const indiceActual = ESTADOS.indexOf(pedidoEncontrado.estado)
      if (indiceActual !== -1 && indiceActual < ESTADOS.length - 1) {
        pedidoEncontrado.estado = ESTADOS[indiceActual + 1]
        mostrarPedidosRegistrados()
      }
    }
  })
}

// Listeners para agregar productos al pedido
if (catalogo) {
  catalogo.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-id]')
    if (!boton) return

    const id = Number(boton.dataset.id)
    const productoEncontrado = productos.find(p => p.id === id)

    if (productoEncontrado) {
      pedido.push(productoEncontrado)
      mostrarPedido()
      document.getElementById('error-pedido')?.classList.add('hidden')
    }
  })
}

// Listener para los filtros de categoría
if (contenedorFiltros) {
  contenedorFiltros.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-categoria]')
    if (!boton) return

    categoriaActual = boton.dataset.categoria

    const listaFiltrada = categoriaActual === 'todos' 
      ? productos 
      : productos.filter(p => p.categoria === categoriaActual)

    mostrarFiltros()       
    mostrarProductos(listaFiltrada) 
  })
}

// Listener para vaciar pedido
if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    pedido.length = 0
    mostrarPedido()
  })
}

// Validaciones del formulario y Registro del Pedido
const formCliente = document.getElementById('form-cliente')
const inputNombre = document.getElementById('nombre')
const inputTelefono = document.getElementById('telefono')
const inputCorreo = document.getElementById('correo')

const errorNombre = document.getElementById('error-nombre')
const errorTelefono = document.getElementById('error-telefono')
const errorCorreo = document.getElementById('error-correo')
const errorPedido = document.getElementById('error-pedido')

if (formCliente) {
  formCliente.addEventListener('submit', (evento) => {
    evento.preventDefault()

    let esValido = true
    const nombre = inputNombre.value.trim()
    const telefono = inputTelefono.value.trim()
    const correo = inputCorreo.value.trim()

    
    if (nombre === '') {
      errorNombre.textContent = 'El nombre no puede estar vacío.'
      errorNombre.classList.remove('hidden')
      inputNombre.classList.add('border-rose-500', 'bg-rose-50')
      esValido = false
    } else {
      errorNombre.classList.add('hidden')
      inputNombre.classList.remove('border-rose-500', 'bg-rose-50')
    }

    // 2. Validar Teléfono (10 dígitos)
    const regexTelefono = /^\d{10}$/
    if (!regexTelefono.test(telefono)) {
      errorTelefono.textContent = 'El teléfono debe tener exactamente 10 dígitos.'
      errorTelefono.classList.remove('hidden')
      inputTelefono.classList.add('border-rose-500', 'bg-rose-50')
      esValido = false
    } else {
      errorTelefono.classList.add('hidden')
      inputTelefono.classList.remove('border-rose-500', 'bg-rose-50')
    }

    const regexCorreo = /^\S+@\S+\.\S+$/
    if (!regexCorreo.test(correo)) {
      errorCorreo.textContent = 'El correo debe tener un formato válido.'
      errorCorreo.classList.remove('hidden')
      inputCorreo.classList.add('border-rose-500', 'bg-rose-50')
      esValido = false
    } else {
      errorCorreo.classList.add('hidden')
      inputCorreo.classList.remove('border-rose-500', 'bg-rose-50')
    }


    if (pedido.length === 0) {
      errorPedido.textContent = 'Agrega al menos un producto al pedido antes de confirmar.'
      errorPedido.classList.remove('hidden')
      esValido = false
    } else {
      errorPedido.classList.add('hidden')
    }

    // Si la validación pasa, registrar pedido
    if (esValido) {
      const totalCalculado = pedido.reduce((suma, p) => suma + p.precio, 0)

      pedidosRegistrados.push({
        id: Date.now(),
        cliente: { nombre, telefono, correo },
        productos: [...pedido],
        total: totalCalculado,
        estado: 'Pendiente'
      })

    
      pedido.length = 0
      formCliente.reset()

      mostrarPedido()
      mostrarPedidosRegistrados()
    }
  })
}

// Inicialización
mostrarFiltros()
mostrarProductos(productos)
mostrarPedido()
mostrarPedidosRegistrados()