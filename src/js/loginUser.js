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
    if (!esValido) return;

    const usuario = {
        correoElectronico: correoElectronico.value,
        contrasenaUsuario: contrasenaUsuario.value
    };

    try {
        const usuarioLogueado = await loginUsuario(usuario);
        alert("Login exitoso. Bienvenido " + usuarioLogueado.nombre);
        
        const idRol = usuarioLogueado.rol?.idRol;
        console.log("rol:", idRol);
        console.log("usuarioLogueado.idRol:", usuarioLogueado.idRol);
        
        if (idRol === 1) {
            window.location.href = "vistaAdministrador.html";
        } else if (idRol === 2) {
            window.location.href = "vistaComprador.html";
        } else if (idRol === 3) {
            window.location.href = "vistaVendedor.html";
        } else {
            alert("Rol desconocido, no se pudo redirigir.");
        }


    } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
        console.error(error);
    }
});