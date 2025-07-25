import { obtenerUsuarios, obtenerCiudades, obtenerRoles } from "../app.js";

const mostrarUsuarios = async () => {
  const [usuarios, ciudades, roles] = await Promise.all([
    obtenerUsuarios(),
    obtenerCiudades(),
    obtenerRoles()
  ]);

  // Guardarlos para poder acceder luego al hacer clic en editar
  localStorage.setItem('usuariosCargados', JSON.stringify(usuarios));
  const tableContenedor = document.querySelector('.table-container');

  // Crear elementos de tabla
  const table = document.createElement('table');
  const tableEncabezado = document.createElement('thead');
  const tableCuerpo = document.createElement('tbody');
  const tableFila = document.createElement('tr');

  // Estructura de la tabla: append elementos padres e hijos
  tableContenedor.append(table);
  table.append(tableEncabezado, tableCuerpo);
  tableEncabezado.append(tableFila);

  // Agregar clases a tabla y partes
  table.classList.add('table');
  tableEncabezado.classList.add('table__encabezado');
  tableCuerpo.classList.add('table__cuerpo');
  tableFila.classList.add('table__fila');

  // Campos para encabezado de la tabla
  const campos = ["Id", "Nombre", "Apellido", "Email", "Contraseña", "Teléfono", "Dirección", "Ciudad", "Rol", "Acciones"];

  // Crear y agregar celdas encabezado con texto y clases
  campos.forEach(campo => {
    const th = document.createElement('th');
    th.textContent = campo;
    tableFila.append(th);
    th.classList.add('table__celda');
  });

  // Recorrer datos usuarios para crear filas y celdas
  usuarios.forEach(user => {
    // Crear fila y array con datos del usuario
    const filaDatos = document.createElement('tr');
    // Buscar el nombre de la ciudad y del rol
    const ciudadNombre = ciudades.find(c => c.idCiudad === user.idCiudad)?.nombreCiudad || "Sin ciudad";
    const rolNombre = roles.find(r => r.idRol === user.idRol)?.nombreRol || "Sin rol";
    const datos = [
      user.idUsuario,
      user.nombre,
      user.apellido,
      user.correoElectronico,
      user.contrasenaUsuario,
      user.numTelefono,
      user.direccion,
      ciudadNombre,
      rolNombre
    ];
    // Crear celdas con texto para cada dato
    datos.forEach(dato => {
      const td = document.createElement('td');
      td.textContent = dato;
      filaDatos.appendChild(td);
      // Clase al final
      td.classList.add('table__celda', 'table__celda--dato');
    });

    // Crear celda de acciones y botones con iconos
    const celdaAcciones = document.createElement('td');
    const btnEditar = document.createElement('button');
    const btnEliminar = document.createElement('button');

    const iconoEditar = document.createElement('iconify-icon');
    const iconoEliminar = document.createElement('iconify-icon');

    // Agregar atributos a iconos y el id a los botones
    iconoEditar.setAttribute('icon', 'mdi:pencil-outline');
    iconoEliminar.setAttribute('icon', 'mdi:trash-can-outline');


    // Agregar clases a iconos y botones
    btnEditar.classList.add('button', 'button--gradiente-agua-turquesa', 'button--gradiente-ambar', 'btnEditarUsuarioAdmin');
    btnEliminar.classList.add('button', 'button--gradiente-agua-turquesa', 'button--gradiente-rojo');
    iconoEditar.classList.add('icon', 'icon--blanco-agrandado');
    iconoEliminar.classList.add('icon', 'icon--blanco-agrandado');

    // Agregar iconos y texto a botones
    btnEditar.append(iconoEditar);
    btnEditar.append(document.createTextNode('EDITAR'));
    btnEliminar.append(iconoEliminar);
    btnEliminar.append(document.createTextNode('ELIMINAR'));

    // Append botones a la celda de acciones
    celdaAcciones.append(btnEditar, btnEliminar);

    // Agregar celda de acciones a la fila
    filaDatos.append(celdaAcciones);

    // Agregar clases a fila, celda de acciones y celdas de datos
    filaDatos.classList.add('table__fila', 'table__fila--turquesa-opaco');
    celdaAcciones.classList.add('table__celda', 'table__celda--flex-columna', 'table__celda--dato');

    // Agregar fila al cuerpo
    tableCuerpo.append(filaDatos);
  });
};

const modal = document.querySelector('#modalEditarDatosUsuario');

const openModalUsuarios = (e) => {
  const elemento = e.target;
  if (elemento.closest(".btnEditarUsuarioAdmin")) {
    e.preventDefault();
    modal.classList.add('modal--show');
  }
  if (elemento.closest("#cerrarModalEditarUsuarioAdmin")) {
    e.preventDefault();
    modal.classList.remove('modal--show');
  }
}
document.addEventListener('click', openModalUsuarios);
mostrarUsuarios();