const modal = document.querySelector('#modalNotificaciones');
const openModalNotificaciones = (e) => {
  const elemento = e.target;

  // Abrir modal si se clickea el botón con clase btnDetallesArticulo
  if (elemento.closest('.btnDetalleNotificacion')) {
    e.preventDefault();
    modal.classList.add('modal--show');
    // Aquí podrías cargar la info del artículo con JS dinámicamente
  }

  // Cerrar modal si se clickea el botón con clase modal__close
  if (elemento.closest('#cerrarModal')) {
    e.preventDefault();
    modal.classList.remove('modal--show');
  }
};

document.addEventListener('click', openModalNotificaciones);