// Importa las funciones necesarias desde los archivos externos
import { crearImagen, obtenerCategorias } from '../app.js';

// Obtengo la referencia al formulario
const formCreateArticulo = document.querySelector('#form-create-articulo');
// Obtengo referencias al formulario y campos
const nombreArticulo = document.querySelector('input[name="nombre_articulo"]');
const precioArticulo = document.querySelector('input[name="precio_articulo"]');
const condicionArticulo = document.querySelector('textarea[name="condicion_articulo"]');
const stock = document.querySelector('input[name="stock"]');
const idcategoria = document.querySelector('select[name="id_categoria"]');
const imagenInput = document.querySelector('input[name="imagenes"]');

formCreateArticulo.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('nombreArticulo', nombreArticulo.value);
  formData.append('precioArticulo', precioArticulo.value);
  formData.append('condicionArticulo', condicionArticulo.value);
  formData.append('stock', stock.value);
  formData.append('idCategoria', idcategoria.value);
  // Adjuntar todas las imágenes seleccionadas
  for (let i = 0; i < imagenInput.files.length; i++) {
    formData.append('imagenes', imagenInput.files[i]);
  }

  try {
    await crearImagen(formData);
    alert('Artículo creado correctamente');
    formCreateArticulo.reset();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Ocurrió un error al crear el artículo.');
  }
});


// Llena dinámicamente el select de ciudades
const cargarCategorias = async () => {
  const categorias = await obtenerCategorias();

  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.classList.add('option');
    option.value = categoria.idCategoria;
    option.textContent = categoria.nombreCategoria;
    idcategoria.append(option);
  });
};
cargarCategorias();