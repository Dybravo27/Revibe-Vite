import { cargarArticulos } from "../app.js";

const renderizarArticulo = async () => {
  try {
    const articulos = await cargarArticulos();  // Asumimos que ya es el objeto JSON
    console.log(articulos);

    const layout = document.querySelector('.layout');

    articulos.forEach(({ idArticulo, nombreArticulo, precioArticulo, categoria, fotos = [], vendedor }) => {
      // Crear elementos
      const card = document.createElement('div');
      const img = document.createElement('img');
      const card__title = document.createElement('div');
      const title = document.createElement('h1');
      const card__details = document.createElement('div');
      
      const text_precio = document.createElement('p');
      const text_categoria = document.createElement('p');
      const text_ciudad = document.createElement('p');
      const text_autor = document.createElement('p');
      
      const strong_precio = document.createElement('strong');
      const strong_categoria = document.createElement('strong');
      const strong_ciudad = document.createElement('strong');
      const strong_autor = document.createElement('strong');
      
      const card__buttons = document.createElement('div');
      const button_detalle = document.createElement('button');
      const icon_detalle = document.createElement('iconify-icon');
      const button_anadir = document.createElement('button');
      const icon_anadir = document.createElement('iconify-icon');
      // Añadir clases a los elementos
      card.classList.add('card');
      img.classList.add('img', 'img--sin_efecto_hover');
      card__title.classList.add('card__title-container');
      title.classList.add('title-principal', 'title-principal--beige-sin_sombra');
      card__details.classList.add('card__details');
      
      text_precio.classList.add('text', 'text--no_desborda');
      text_categoria.classList.add('text', 'text--no_desborda');
      text_ciudad.classList.add('text', 'text--no_desborda');
      text_autor.classList.add('text', 'text--no_desborda');
      
      strong_precio.classList.add('strong');
      strong_categoria.classList.add('strong');
      strong_ciudad.classList.add('strong');
      strong_autor.classList.add('strong');
      
      card__buttons.classList.add('card__buttons');
      button_detalle.classList.add('button', 'button--gradiente-agua-turquesa', 'btnDetallesArticulo');
      button_anadir.classList.add('button', 'button--gradiente-agua-turquesa');
      icon_detalle.classList.add('icon', 'icon--blanco-agrandado');
      icon_anadir.classList.add('icon', 'icon--blanco-agrandado');
      
      // Atributos
      img.setAttribute('src', fotos.length > 0 ? `http://localhost:8080/Proyecto_Dylan_ReVibe/${fotos[0]}` : 'img/placeholder.png');
      img.setAttribute('alt', 'producto');
      
      icon_detalle.setAttribute('icon', 'mdi:information-outline');
      icon_anadir.setAttribute('icon', 'ph:shopping-cart');
      // Títulos y contenido
      title.textContent = nombreArticulo;
      
      strong_precio.textContent = "Precio:";
      text_precio.append(strong_precio);
      text_precio.append(` $ ${precioArticulo}`);
      
      strong_categoria.textContent = "Categoría:";
      text_categoria.append(strong_categoria);
      text_categoria.append(` ${categoria.nombreCategoria}`);
      
      strong_ciudad.textContent = "Ciudad:";
      text_ciudad.append(strong_ciudad);
      text_ciudad.append(` ${vendedor.ciudad.nombreCiudad}`);
      
      strong_autor.textContent = "Publicado por:";
      text_autor.append(strong_autor);
      text_autor.append(` ${vendedor.nombre}`);
      // Agregar todo al contenedor de la card
      layout.append(card);
      card.append(img, card__title, card__details, card__buttons);
      card__title.append(title);
      card__details.append(text_precio,text_categoria,text_ciudad, text_autor);
      card__buttons.append(button_detalle, button_anadir);
      button_detalle.append(icon_detalle, document.createTextNode(' Ver Detalles'));
      button_anadir.append(icon_anadir, document.createTextNode(' Añadir al Carrito'));
    });
  } catch (error) {
    console.error('Error al cargar los artículos:', error);
  }
}

renderizarArticulo();


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