// Importa funciones desde app.js
import { crearArticulo, obtenerCategorias, obtenerCiudades } from '../app.js';

// Referencias al formulario y campos
const formCreateArticulo = document.querySelector('#form-create-articulo');
const nombreArticulo = document.querySelector('input[name="nombre_articulo"]');
const precioArticulo = document.querySelector('input[name="precio_articulo"]');
const condicionArticulo = document.querySelector('textarea[name="condicion_articulo"]');
const stock = document.querySelector('input[name="stock"]');
const idCategoria = document.querySelector('select[name="id_categoria"]');
const imagenInput = document.querySelector('input[name="imagenes"]');

// Evento de envío del formulario
formCreateArticulo.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Validación de campos vacíos
  if (
    !nombreArticulo.value ||
    !precioArticulo.value ||
    !condicionArticulo.value ||
    !stock.value ||
    !idCategoria.value ||
    imagenInput.files.length === 0
  ) {
    console.warn('⚠️ Todos los campos son obligatorios, incluyendo al menos una imagen.');
    alert('Completa todos los campos antes de continuar.');
    return;
  }

  // Obtener datos del usuario desde localStorage
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioLocal) {
    alert("No se encontraron datos del usuario. Inicia sesión nuevamente.");
    window.location.href = '../login.html';
    return;
  }

  const usuarioId = usuarioLocal.idUsuario;

  // Llenar el FormData con los campos del artículo
  formData.append('nombreArticulo', nombreArticulo.value);
  formData.append('precioArticulo', precioArticulo.value);
  formData.append('condicionArticulo', condicionArticulo.value);
  formData.append('stock', stock.value);
  formData.append('idCategoria', idCategoria.value);

  // Datos del usuario (ciudad, dirección y usuario)
  formData.append('idCiudad', usuarioLocal.ciudad?.idCiudad); // ✅ estructura ciudad.idCiudad
  formData.append('direccion', usuarioLocal.direccion);
  formData.append('id_usuario', usuarioId);

  console.log("✅ ID del usuario logueado:", usuarioId);

  // Mostrar campos en consola (excepto imágenes)
  for (let [key, value] of formData.entries()) {
    if (key !== 'imagenes') {
      console.log(`${key}:`, value);
    }
  }

  // Agregar imágenes y mostrar info de cada una
  for (let i = 0; i < imagenInput.files.length; i++) {
    const imagen = imagenInput.files[i];
    formData.append('imagenes', imagen);
    console.log(`Imagen ${i + 1} seleccionada: ${imagen.name}`);
  }

  // Enviar los datos al backend
  try {
    await crearArticulo(formData);
    alert('Artículo creado correctamente');
    console.log('Artículo enviado correctamente al servidor.');
    formCreateArticulo.reset();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Ocurrió un error al crear el artículo. Revisa la consola para más detalles.');
  }
});

// Cargar categorías en el select
const cargarCategorias = async () => {
  try {
    const categorias = await obtenerCategorias();
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.classList.add('option');
      option.value = categoria.idCategoria;
      option.textContent = categoria.nombreCategoria;
      idCategoria.append(option);
    });
    console.log('Categorías cargadas correctamente.');
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

// Inicialización
cargarCategorias();