const modal = document.querySelector('#modalArticuloVendedor');
const modalEditar = document.querySelector('#modalEditarArticulo');
const modalComentarios = document.querySelector('#modalComentariosVendedor');
const modalNotificacion = document.querySelector('#modalNotificacionesVendedor');
const modalVentas = document.querySelector('#modalVentasRealizadas');

const openModalCompras = (e) => {
  const elemento = e.target;

  // Abrir modal de detalle
  if (elemento.closest('.btnDetalleArticulo')) {
    e.preventDefault();
    modal.classList.add('modal--show');
  }

  // Abrir modal de edición
  if (elemento.closest('.btnEditarArticulo')) {
    e.preventDefault();
    modalEditar.classList.add('modal--show');
  }

  // Abrir modal de comentarios
  if (elemento.closest('.btnComentarioArticuloVendedor')) {
    e.preventDefault();
    modalComentarios.classList.add('modal--show');
  }
  // Abrir modal de comentarios
  if (elemento.closest('.btnNotificacionVendedor')) {
    e.preventDefault();
    modalNotificacion.classList.add('modal--show');
  }
  // Abrir modal de comentarios
  if (elemento.closest('.btnVentasRealizadasVendedor')) {
    e.preventDefault();
    modalVentas.classList.add('modal--show');
  }

  // Cerrar modal de detalle
  if (elemento.closest('#cerrarModalArticulo')) {
    e.preventDefault();
    modal.classList.remove('modal--show');
  }

  // Cerrar modal de edición
  if (elemento.closest('#cerrarModalEditar')) {
    e.preventDefault();
    modalEditar.classList.remove('modal--show');
  }

  // Cerrar modal de comentarios
  if (elemento.closest('#cerrarModalComentarios')) {
    e.preventDefault();
    modalComentarios.classList.remove('modal--show');
  }
  if (elemento.closest('#cerrarModalNotificacion')) {
    e.preventDefault();
    modalNotificacion.classList.remove('modal--show');
  }
  if (elemento.closest('#cerrarModalVentas')) {
    e.preventDefault();
    modalVentas.classList.remove('modal--show');
  }
};

document.addEventListener('click', openModalCompras);
