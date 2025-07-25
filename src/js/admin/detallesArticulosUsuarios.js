const modal = document.querySelector('#modalArticuloVendedor');
const modalEditar = document.querySelector('#modalEditarArticulo');

const openModalAdmin = (e) => {
  const elemento = e.target;

  // Abrir modal de detalle
  if (elemento.closest('.btnDetalleArticulo')) {
    e.preventDefault();
    modal.classList.add('modal--show');
  }

  // Cerrar modal de detalle
  if (elemento.closest('#cerrarModalArticulo')) {
    e.preventDefault();
    modal.classList.remove('modal--show');
  }

  // Abrir modal de edición
  if (elemento.closest('.btnEditarArticuloAdmin')) {
    e.preventDefault();
    modalEditar.classList.add('modal--show');
  }
  // Cerrar modal de edición
  if (elemento.closest('#cerrarModalEditarAdmin')) {
    e.preventDefault();
    modalEditar.classList.remove('modal--show');
  }
};

document.addEventListener('click', openModalAdmin);