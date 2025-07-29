import { cargarArticulos } from "../app.js";
let articulosGlobal = [];
const renderizarArticulo = async () => {
  try {
    const articulos = await cargarArticulos();
    articulosGlobal = articulos;
    const layout = document.querySelector('.layout');
    layout.innerHTML = ''; // Limpiar antes de insertar

    articulos.forEach(({ idArticulo, nombreArticulo, precioArticulo, categoria, fotos = [], vendedor }) => {
      const urlImagen = fotos.length > 0 
        ? `http://localhost:8080/Proyecto_Dylan_ReVibe/${fotos[0]}` 
        : 'img/placeholder.png';

      const cardHTML = `
        <div class="card">
          <img class="img img--sin_efecto_hover" src="${urlImagen}" alt="producto">

          <div class="card__title-container">
            <h1 class="title-principal title-principal--beige-sin_sombra">${nombreArticulo}</h1>
          </div>

          <div class="card__details">
            <p class="text text--no_desborda"><strong class="strong">Precio:</strong> $${precioArticulo}</p>
            <p class="text text--no_desborda"><strong class="strong">Categoría:</strong> ${categoria.nombreCategoria}</p>
            <p class="text text--no_desborda"><strong class="strong">Ciudad:</strong> ${vendedor.ciudad.nombreCiudad}</p>
            <p class="text text--no_desborda"><strong class="strong">Publicado por:</strong> ${vendedor.nombre} ${vendedor.apellido}</p>
          </div>

          <div class="card__buttons">
            <button class="button button--gradiente-agua-turquesa btnDetallesArticulo" data-id="${idArticulo}">
              <iconify-icon icon="mdi:information-outline" class="icon icon--blanco-agrandado"></iconify-icon>
              Ver Detalles
            </button>
            <button class="button button--gradiente-agua-turquesa">
              <iconify-icon icon="ph:shopping-cart" class="icon icon--blanco-agrandado"></iconify-icon>
              Añadir al Carrito
            </button>
          </div>
        </div>
      `;
      layout.insertAdjacentHTML('beforeend', cardHTML);
    });
  } catch (error) {
    console.error('Error al cargar los artículos:', error);
  }
};

renderizarArticulo();

const modal = document.querySelector('#modalArticulo');

const openModalArticulo = (e) => {
  const boton = e.target.closest('.btnDetallesArticulo');
  const cerrar = e.target.closest('#cerrarModal');

  if (boton) {
    e.preventDefault();
    const id = boton.dataset.id;
    const articulo = articulosGlobal.find(a => a.idArticulo == id);
    if (articulo) {
      mostrarModalArticulo(articulo);
    }
    else{
      alert("No se pudo cargar el detalle del artículo. El artículo no fue encontrado.");
    }
  }

  if (cerrar) {
    e.preventDefault();
    modal.classList.remove('modal--show');
  }
};

document.addEventListener('click', openModalArticulo);

let imagenesCarrusel = [];
let indiceActual = 0;

const mostrarModalArticulo  = (articulo) =>{
  const { nombreArticulo, precioArticulo, condicionArticulo, stock, categoria, vendedor, fotos = [] } = articulo;

  imagenesCarrusel = fotos.map(f => `http://localhost:8080/Proyecto_Dylan_ReVibe/${f}`);
  indiceActual = 0;

  const modal = document.querySelector("#modalArticulo");
  const title = document.querySelector('.modal__header h1');
  title.textContent = nombreArticulo;

  const imgElemento = modal.querySelector('.img--carrusel');
  imgElemento.src = imagenesCarrusel[indiceActual];

  const modalDetalle  = document.querySelector('.modal__detalle-articulo');
  const modalVendedor = document.querySelector('.modal__vendedor');

  modalDetalle.innerHTML = `
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Precio:</strong> $ ${precioArticulo}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Stock:</strong> ${stock} unidades</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Categoría:</strong> ${categoria.nombreCategoria}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Condición:</strong> ${condicionArticulo}</p>
  `;

  modalVendedor.innerHTML = `
  <h3 class="subtitle">Publicado por</h3>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Nombre:</strong> ${vendedor.nombre} ${vendedor.apellido}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Correo:</strong> ${vendedor.correoElectronico}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Teléfono:</strong> ${vendedor.numTelefono}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Ciudad:</strong> ${vendedor.ciudad.nombreCiudad}</p>
  <p class="text text--no_desborda text--turquesa-oscuro text--desbordamiento"><strong class="strong strong--resaltado-verde-menta">Direccion:</strong> ${vendedor.direccion}</p>
  `;

  modal.classList.add('modal--show');
}

const carrusel = (e)=>{
  const izquierda = e.target.closest('.btnIzquierda');
  const derecha = e.target.closest('.btnDerecha');

  if (!imagenesCarrusel.length) return;

  if (izquierda) {
    e.preventDefault();
    indiceActual = (indiceActual - 1 + imagenesCarrusel.length) % imagenesCarrusel.length;
  }

  if (derecha) {
    e.preventDefault();
    indiceActual = (indiceActual + 1) % imagenesCarrusel.length;
  }

  if (izquierda || derecha) {
    const img = document.querySelector('.img--carrusel');
    // console.log("Actualizando imagen con src:", imagenesCarrusel[indiceActual]);
    img.src = imagenesCarrusel[indiceActual];
  }
}

document.addEventListener('click', carrusel);