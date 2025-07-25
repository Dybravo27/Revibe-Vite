const modal = document.querySelector('#modalArticulo');

const openModalArticulo = (e) => {
  const elemento = e.target;

  // Abrir modal si se clickea el botón con clase btnDetallesArticulo
  if (elemento.closest('.btnDetallesArticulo')) {
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

document.addEventListener('click', openModalArticulo);

const imagenes = [
  '../img/zapatos.png',
  '../img/zapatos2.jpeg',
  '../img/zapatos3.jpg'
];

let indiceActual = 0;

// Selecciona correctamente los elementos
const imgElemento = document.querySelector('.img--carrusel');

// Función de carrusel
export const carrusel = (e) => {
  const elemento = e.target;

  // Botón izquierda
  if (elemento.closest('.btnIzquierda')) {
    e.preventDefault();
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    imgElemento.src = imagenes[indiceActual];
  }

  // Botón derecha
  if (elemento.closest('.btnDerecha')) {
    e.preventDefault();
    indiceActual = (indiceActual + 1) % imagenes.length;
    imgElemento.src = imagenes[indiceActual];
  }
};

document.addEventListener('click', carrusel);