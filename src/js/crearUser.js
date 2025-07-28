// Importa las funciones necesarias desde los archivos externos
import { crearUsuario, correoYaExiste, obtenerCiudades } from './app.js';

import {
  validacionSoloLetras,
  validacionSoloNumeros,
  validacionCorreo,
  validacionContrasena,
  limpiar,
  validacionDiezCaracter,
  validarFormulario,
  esCorreoValido
} from './module.js';

// Obtengo la referencia al formulario
const formCreate = document.querySelector('form');
// Obtengo las referencias a los campos del formulario individualmente por su atributo "name"
const nombre = document.querySelector('input[name="nombres"]');
const apellido = document.querySelector('input[name="apellidos"]');
const correoElectronico = document.querySelector('input[name="email"]');
const numTelefono = document.querySelector('input[name="telefono"]');
const idCiudad = document.querySelector('select[name="ciudad"]');
const idRol = document.querySelector('select[name="rol"]');
const direccion = document.querySelector('input[name="direccion"]');
const contrasenaUsuario = document.querySelector('input[name="contrasena"]');
const confirmarContrasena = document.querySelector('input[name="confirmar_contrasena"]');


// EVENTOS PARA VALIDAR QUE INGRESEN CIERTOS CARACTERES PARA LOS CAMPOS
// Permite solo letras en los campos de nombre y apellido
nombre.addEventListener('keydown', validacionSoloLetras);
apellido.addEventListener('keydown', validacionSoloLetras);
// Valida que solo se ingresen caracteres permitidos en correos electrónicos
correoElectronico.addEventListener('keydown', validacionCorreo);
// Solo permite números en el campo teléfono
numTelefono.addEventListener('keydown', validacionSoloNumeros);
// Valida caracteres permitidos en la contraseña al escribir
contrasenaUsuario.addEventListener('keydown', validacionContrasena);
confirmarContrasena.addEventListener('keydown', validacionContrasena);

// Limpia errores visuales cuando el usuario sale del campo
nombre.addEventListener('blur', limpiar);
apellido.addEventListener('blur', limpiar);
correoElectronico.addEventListener('blur', limpiar);
numTelefono.addEventListener('blur', limpiar);
idCiudad.addEventListener('blur', limpiar);
idRol.addEventListener('blur', limpiar);
direccion.addEventListener('blur', limpiar);
contrasenaUsuario.addEventListener('blur', limpiar);
confirmarContrasena.addEventListener('blur', limpiar);

// Limita el campo de teléfono a un máximo de 10 caracteres
numTelefono.addEventListener('keypress', validacionDiezCaracter);


formCreate.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Se llama a la función de validación general de todos los campos
  const esValido = validarFormulario(e);
  // Si no pasa la validación, se detiene aquí
  if (!esValido) return;

  if (!esCorreoValido(correoElectronico.value)) {
    alert("Correo electrónico no válido");
    return;
  }
  // Validar si el correo ya está registrado
  const existe = await correoYaExiste(correoElectronico.value);
  if (existe) {
    alert("Este correo ya está registrado. Intenta con otro.");
    return;
  }
  // Validación: contraseña segura (mínimo 6 caracteres)
  if (contrasenaUsuario.value.length < 8 ) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }
  // Validación de largo exacto del teléfono
  if (numTelefono.value.length < 9 || numTelefono.value.length > 10) {
    alert("El número de teléfono debe tener 9 o 10 dígitos");
    return;
  }

  const contrasena = contrasenaUsuario.value;

  // Validación de contraseña: mínimo 8 caracteres, letras y números
  const regexContrasenaSegura = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!regexContrasenaSegura.test(contrasena)) {
    alert('La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.');
    return;
  }

  // Validación: confirmar contraseña
  if (contrasena !== confirmarContrasena.value) {
    alert('LAS CONTRASEÑAS NO COINCIDEN');
    return;
  }

  // Se crea un objeto con los datos del nuevo usuario para enviarlo al backend
  const nuevoUsuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    correoElectronico: correoElectronico.value,
    contrasenaUsuario: contrasenaUsuario.value,
    numTelefono: numTelefono.value,
    direccion: direccion.value,
    ciudad: {
      idCiudad: parseInt(idCiudad.value)
    },
    rol: {
      idRol: parseInt(idRol.value)
    }
  };

  console.log("Enviando usuario:", nuevoUsuario);
  try {
    // Llamar la función de crearUsuario
    await crearUsuario(nuevoUsuario);  // Aquí esperamos la creación del usuario

    // Si se creó correctamente, limpiamos el formulario y redirigimos
    formCreate.reset();
    window.location.href = 'login.html';  // Redirigir al login
  } catch (error) {
    // Si ocurre un error (como un conflicto con el correo), muestra el error
    console.error('Error al crear usuario:', error);
    alert(error.message);  // Mostrar el mensaje de error al usuario, por ejemplo: "El correo electrónico ya está registrado."
  }
});

// Llena dinámicamente el select de ciudades
const cargarCiudades = async () => {
  const ciudades = await obtenerCiudades();

  ciudades.forEach(ciudad => {
    const option = document.createElement('option');
    option.classList.add('option');
    option.value = ciudad.idCiudad;
    option.textContent = ciudad.nombreCiudad;
    idCiudad.append(option);
  });
};

// Llena dinámicamente el select de roles
// const cargarRoles = async () => {
//   const roles = await obtenerRoles();

//   roles.forEach(rol => {
//     const option = document.createElement('option');
//     option.classList.add('option');
//     option.value = rol.idRol;
//     option.textContent = rol.nombreRol;
//     idRol.append(option);
//   });
// };

cargarCiudades();