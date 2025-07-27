// Importa funciones desde app.js
import { crearImagen, obtenerCategorias, obtenerCiudades } from '../app.js';

// Referencias al formulario y campos
const formCreateArticulo = document.querySelector('#form-create-articulo');
const nombreArticulo = document.querySelector('input[name="nombre_articulo"]');
const precioArticulo = document.querySelector('input[name="precio_articulo"]');
const condicionArticulo = document.querySelector('textarea[name="condicion_articulo"]');
const stock = document.querySelector('input[name="stock"]');
const idCategoria = document.querySelector('select[name="id_categoria"]');
const idCiudad = document.querySelector('select[name="id_ciudad"]');
const direccion = document.querySelector('input[name="direccion"]');
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
    !idCiudad.value ||
    !direccion.value ||
    imagenInput.files.length === 0
  ) {
    console.warn('⚠️ Todos los campos son obligatorios, incluyendo al menos una imagen.');
    alert('Completa todos los campos antes de continuar.');
    return;
  }

  formData.append('nombreArticulo', nombreArticulo.value);
  formData.append('precioArticulo', precioArticulo.value);
  formData.append('condicionArticulo', condicionArticulo.value);
  formData.append('stock', stock.value);
  formData.append('idCategoria', idCategoria.value);
  formData.append('idCiudad', idCiudad.value);
  formData.append('direccion', direccion.value);

  // ID del usuario desde localStorage
  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId || usuarioId === "null") {
    alert("Debes iniciar sesión antes de crear un artículo.");
    window.location.href = '../login.html';
    return;
  }

  console.log("✅ ID del usuario logueado:", usuarioId);

  // Asegúrate de que coincida con lo que espera el backend
  formData.append("id_usuario", usuarioId);

  // Mostrar todos los valores de FormData (excepto imágenes por ahora)
  for (let [key, value] of formData.entries()) {
    if (key !== 'imagenes') {
      console.log(`📝 ${key}:`, value);
    }
  }

  // Agregar todas las imágenes y mostrar ruta local de cada una
  for (let i = 0; i < imagenInput.files.length; i++) {
    formData.append('imagenes', imagenInput.files[i]);
    console.log(`🖼️ Imagen ${i + 1} seleccionada: ${imagenInput.files[i].name}`);
  }

  try {
    await crearImagen(formData);
    alert('Artículo creado correctamente');
    console.log('Artículo enviado correctamente al servidor.');
    formCreateArticulo.reset();
  } catch (error) {
    console.error('❌ Error al enviar el formulario:', error);
    alert('Ocurrió un error al crear el artículo. Revisa la consola para más detalles.');
  }
});

// Cargar categorías
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

// Cargar ciudades
const cargarCiudades = async () => {
  try {
    const ciudades = await obtenerCiudades();
    ciudades.forEach(ciudad => {
      const option = document.createElement('option');
      option.classList.add('option');
      option.value = ciudad.idCiudad;
      option.textContent = ciudad.nombreCiudad;
      idCiudad.append(option);
    });
    console.log(' Ciudades cargadas correctamente.');
  } catch (error) {
    console.error(' Error al cargar ciudades:', error);
  }
};

// Inicializar
cargarCategorias();
cargarCiudades();
