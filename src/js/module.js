// funcion que valida todo el formulario a la hora de crear el usuario
export const validarFormulario = (e) => {
  e.preventDefault(); // Previene que el formulario se envíe automáticamente
  let valido = true; // Bandera que indica si todos los campos son válidos

  // Selecciona todos los campos del formulario que tengan el atributo 'required'
  const campos = [...e.target].filter((elemento) => {
    return elemento.hasAttribute('required');
  });

  // Recorre todos los campos requeridos
  campos.forEach(campo => {
    switch (campo.tagName) {
      case "INPUT":
        if (
          campo.type === "text" ||
          campo.type === "email" ||
          campo.type === "tel" ||
          campo.type === "password"
        ) {
          if (campo.value.trim() === "") {
            if (!campo.dataset.placeholderOriginal) {
              campo.dataset.placeholderOriginal = campo.placeholder;
            }

            campo.classList.add("input--error");
            campo.value = "";

            const textoOriginal = campo.dataset.placeholderOriginal || "Campo";
            const palabra = textoOriginal;
            campo.placeholder = `${palabra} requerido.`;

            valido = false;
          } else {
            campo.classList.remove("input--error");

            if (campo.dataset.placeholderOriginal) {
              campo.placeholder = campo.dataset.placeholderOriginal;
            }
          }
        }
        break;
      case 'SELECT':
        if (campo.selectedIndex === 0) {
          // Elimina la primera opción ("Selecciona una ciudad" o similar) si aún está
          const primeraOpcion = campo.options[0];
          if (primeraOpcion && !primeraOpcion.classList.contains('option--error')) {
            // Guardamos su texto original si no está guardado
            if (!campo.dataset.placeholderOriginal) {
              campo.dataset.placeholderOriginal = primeraOpcion.textContent;
            }
            campo.removeChild(primeraOpcion);
          }

          // Elimina opción de error anterior si existe
          const opcionErrorExistente = [...campo.options].find(opt => opt.classList.contains('option--error'));
          if (opcionErrorExistente) {
            campo.removeChild(opcionErrorExistente);
          }

          campo.classList.add('select--error');

          // Generar mensaje como "Ciudad requerida."
          const textoOriginal = campo.dataset.placeholderOriginal || "Campo";
          const palabra = textoOriginal; // ej: "Ciudad"
          const mensajeError = `${palabra} requerido.`;

          // Crear nueva opción de error
          const mensaje = document.createElement('option');
          mensaje.classList.add('option--error', 'select--error');
          mensaje.disabled = true;
          mensaje.selected = true;
          mensaje.hidden = true;
          mensaje.textContent = mensajeError;
          campo.appendChild(mensaje);

          campo.selectedIndex = campo.options.length - 1;
          valido = false;
        } else {
          campo.classList.remove('select--error');

          // Eliminar opción de error si existe
          const opcionErrorExistente = [...campo.options].find(opt => opt.classList.contains('option--error'));
          if (opcionErrorExistente) {
            campo.removeChild(opcionErrorExistente);
          }

          // Restaurar la primera opción original si estaba guardada
          if (campo.dataset.placeholderOriginal) {
            const opcionRestaurada = document.createElement('option');
            opcionRestaurada.value = "";
            opcionRestaurada.textContent = campo.dataset.placeholderOriginal;
            campo.insertBefore(opcionRestaurada, campo.firstChild);
          }
        }
        break;
    }
  });

  return valido; // Retorna si el formulario pasó o no todas las validaciones
};

// Teclas permitidas universales (teclas de navegación, borrar, etc.)
const teclasPermitidas = [
  "Backspace", "Delete", "Tab", "Enter",
  "Home", "End", "Shift", "ArrowLeft", "ArrowRight"
];
const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Valida que no se ingresen más de 10 caracteres en un input (como teléfono)
export const validacionDiezCaracter = (event) => {
  if (event.target.value.length >= 10 && !teclasPermitidas.includes(event.key)) {
    event.preventDefault(); // Evita que se escriba más
  }
};

// Solo permite letras (bloquea números y otros caracteres)
export const validacionSoloLetras = (event) => {
  const RegExpLetras = /[0-9]/; // Detecta números
  if (RegExpLetras.test(event.key) && !teclasPermitidas.includes(event.key)) {
    event.preventDefault(); // Bloquea el número
  }
};

// Solo permite números (bloquea letras)
export const validacionSoloNumeros = (event) => {
  const RegExpNumeros = /^[a-zA-Z]$/; // Detecta letras
  if (RegExpNumeros.test(event.key) && !teclasPermitidas.includes(event.key)) {
    event.preventDefault(); // Bloquea letras
  }
};

// Permite solo caracteres válidos para correos electrónicos mientras se escribe
export const validacionCorreo = (event) => {
  const regexCaracteresEmail = /^[a-zA-Z0-9@._-]$/;
  if (!regexCaracteresEmail.test(event.key) && !teclasPermitidas.includes(event.key)) {
    event.preventDefault();
  }
};

export const esCorreoValido = (correo) => regexCorreo.test(correo);

// Valida caracteres permitidos para contraseña y limita a 10 caracteres
export const validacionContrasena = (event) => {
  const regexCaracterPermitido = /^[a-zA-Z0-9@#$%]$/; // Letras, números y símbolos seguros

  // Bloquea si no es un carácter válido ni una tecla permitida
  if (!regexCaracterPermitido.test(event.key) && !teclasPermitidas.includes(event.key)) {
    event.preventDefault();
  }

  // También bloquea si ya hay 10 caracteres escritos
  if (event.target.value.length >= 10 && !teclasPermitidas.includes(event.key)) {
    event.preventDefault();
  }
};
// Función que elimina clases de error y restaura placeholders o estilos
export const limpiar = (event) => {
  const campo = event.target;

  if (campo.value.trim() !== "") {
    // Si tenía clase de error, la elimina
    if (campo.classList.contains('input--error')) {
      campo.classList.remove('input--error');

      // Restaura el placeholder original si estaba guardado
      if (campo.dataset.placeholderOriginal) {
        campo.placeholder = campo.dataset.placeholderOriginal;
      }
    }

    // Elimina clase de error en selects
    if (campo.classList.contains('select--error')) {
      campo.classList.remove('select--error');
    }
  }
};