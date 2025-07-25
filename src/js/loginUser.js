import { loginUsuario } from "./app.js";
import { validarFormulario, validacionCorreo, validacionContrasena, limpiar } from "./module.js";
const formLogin = document.querySelector('form');

const correoElectronico = document.querySelector('input[name="email"]');
const contrasenaUsuario = document.querySelector('input[name="contrasena"]');

correoElectronico.addEventListener('keydown', validacionCorreo);
contrasenaUsuario.addEventListener('keydown', validacionContrasena);

correoElectronico.addEventListener('blur', limpiar);
contrasenaUsuario.addEventListener('blur', limpiar);

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const esValido = validarFormulario(e);
    // Si no pasa la validación, se detiene aquí
    if (!esValido) return;
    const usuario = {
        correoElectronico: correoElectronico.value,
        contrasenaUsuario: contrasenaUsuario.value
    };
    try {
        const usuarioLogueado = await loginUsuario(usuario);

        // Mostrar mensaje
        alert("Login exitoso. Bienvenido " + usuarioLogueado.nombre);

        // Redireccionar desde aquí
        window.location.href = "vistaComprador.html"; // ← cambia por tu página real

    } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
        console.error(error);
    }
});