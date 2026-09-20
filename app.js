// Obtener elementos
const form = document.getElementById("clienteForm");
const listaClientes = document.getElementById("listaClientes");

// Cargar datos iniciales
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Mostrar clientes
function renderClientes() {
  listaClientes.innerHTML = "";
  clientes.forEach((cliente, index) => {
    listaClientes.innerHTML += `
      <tr>
        <td>${cliente.nombre}</td>
        <td>${cliente.servicio}</td>
        <td>${cliente.telefono}</td>
        <td>
          <button onclick="editarCliente(${index})">Editar</button>
          <button onclick="eliminarCliente(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Guardar cliente
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const servicio = document.getElementById("servicio").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  // Validación
  if (!nombre || !servicio || !telefono) {
    alert("Todos los campos son obligatorios");
    return;
  }

  clientes.push({ nombre, servicio, telefono });
  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderClientes();
  form.reset();
});

// Editar cliente
function editarCliente(index) {
  const cliente = clientes[index];
  document.getElementById("nombre").value = cliente.nombre;
  document.getElementById("servicio").value = cliente.servicio;
  document.getElementById("telefono").value = cliente.telefono;

  clientes.splice(index, 1); // quitar temporalmente
  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderClientes();
}

// Eliminar cliente
function eliminarCliente(index) {
  clientes.splice(index, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderClientes();
}

// Inicializar
renderClientes();